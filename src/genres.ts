import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked, validateGenreParams, validateIdParam } from "./utils.js";

const router = Router({ mergeParams: true });

// endpoints for genres routes

//get genre list
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.genre.findMany({});
    res.status(200).json({ status: "OK", genres: result });
  })
);

//get one genre by ID
router.get(
  "/:id",
  validateIdParam(),
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (!genre) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Genre not found" });
    }
    res.status(200).json({ status: "OK", genre });
  })
);

//create a new genre
router.post(
  "/",
  validateGenreParams(),
  errorChecked(async (req, res) => {
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { name: req.body.name },
    });
    if (genre) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Genre name must be unique" });
    }
    const newGenre = await prisma.genre.create({ data: req.body });
    res.status(201).json({ status: "OK", newGenre });
  })
);

//update genre
router.put(
  "/:id",
  validateIdParam(),
  validateGenreParams(),
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const genreExists = await prisma.genre.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (genreExists.name) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Genre name must be unique" });
    }
    if (!genreExists) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Genre not found" });
    }
    const updatedGenre = await prisma.genre.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json({ status: "OK", updatedGenre });
  })
);

//delete genre
router.delete(
  "/:id",
  validateIdParam(),
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const genreExists = await prisma.genre.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (!genreExists) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Genre not found" });
    }
    const deletedGenre = await prisma.genre.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ status: "OK", deletedGenre });
  })
);

//get album list by genre ID
router.get(
  "/:id/albums",
  validateIdParam(),
  errorChecked(async (req, res) => {
    const genre = await prisma.genre.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!genre) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Genre not found" });
    }
    const albums = await prisma.album.findMany({
      where: { genreId: Number(req.params.id) },
    });
    res.status(200).json(albums);
  })
);

export default router;

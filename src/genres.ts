import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import albumsRouter from "./albums.js";

const router = Router({ mergeParams: true });

// endpoints for genres routes

//get genre list
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.genre.findMany({});
    res.status(200).json({ genres: result, ok: true });
  })
);

//get one genre by ID
router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    res.status(200).json(genre);
  })
);

//create a new genre
router.post(
  "/",
  errorChecked(async (req, res) => {
    const newGenre = await prisma.genre.create({ data: req.body });
    res.status(200).json({ newGenre, ok: true });
  })
);

//update genre
router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;

    const updatedGenre = await prisma.genre.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedGenre);
  })
);

//delete genre
router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedGenre = await prisma.genre.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedGenre);
  })
);

router.use("/:genreIdFromParams/albums", albumsRouter);

export default router;

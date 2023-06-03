import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import songsRouter from "./songs.js";
const router = Router({ mergeParams: true });

// endpoints for albums routes

//get albums list
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.album.findMany({});
    res.status(200).json({ status: "OK", albums: result });
  })
);

//get albums list of a genre
router.get(
  "/",
  errorChecked(async (req, res) => {
    const albums = await prisma.album.findMany({
      where: { genreId: Number(req.params.genreIdFromParams) },
    });
    res.status(200).json(albums);
  })
);

//get one album by ID
router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const album = await prisma.album.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (!album) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Album no encontrado" });
    }
    res.status(200).json({ status: "OK", album });
  })
);

//create a new album
router.post(
  "/",
  errorChecked(async (req, res) => {
    const { title, duration, genreId } = req.body;
    const genre = await prisma.genre.findUnique({
      where: { id: Number(genreId) },
    });
    const newAlbum = await prisma.album.create({
      data: {
        title,
        duration: Number(duration),
        genreId: Number(genreId),
      },
    });
    if (!genre) {
      return null;
    }
    if (!newAlbum) {
      return res
        .status(400)
        .json({
          status: "FAILED",
          error:
            "No se ha podido crear el nuevo album. Revise los parámetros requeridos",
        });
    }
    res.status(201).json({ status: "OK", newAlbum });
  })
);

//update album
router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const updatedAlbum = await prisma.album.update({
      where: { id: Number(id) },
      data: req.body
    });
    if (!updatedAlbum) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Album no encontrado" });
    }

    res.status(200).json({ status: "OK", updatedAlbum });
  })
);

//delete album
router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedAlbum = await prisma.album.delete({
      where: { id: Number(id) },
    });
    if (!deletedAlbum) {
      return res.status(404).json({ error: "Album no encontrado" });
    }

    res.status(200).json({ status: "OK", deletedAlbum });
  })
);

router.use("/:albumIdFromParams/songs", songsRouter);
export default router;

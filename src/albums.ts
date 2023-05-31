import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import songsRouter from "./songs.js";
import singersRouter from "./singers.js";
const router = Router({ mergeParams: true });

// endpoints for albums routes

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

//get albums list of a singer
router.get(
    "/",
    errorChecked(async (req, res) => {
      const albums = await prisma.album.findMany({
        where: { genreId: Number(req.params.singerIdFromParams) },
      });
      res.status(200).json(albums);
    })
  );


//get albums list
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.album.findMany({});
    res.status(200).json({ albums: result, ok: true });
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
    res.status(200).json(album);
  })
);

//create a new album
router.post(
  "/",
  errorChecked(async (req, res) => {
    const newAlbum = await prisma.album.create({ data: req.body });
    res.status(200).json({ newAlbum, ok: true });
  })
);

//update album
router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;

    const updatedAlbum = await prisma.album.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedAlbum);
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
    res.status(200).json(deletedAlbum);
  })
);

router.use("/:albumIdFromParams/songs", songsRouter);
router.use("/:albumIdFromParams/singers", singersRouter);

export default router;

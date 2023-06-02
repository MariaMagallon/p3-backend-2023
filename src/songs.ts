import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import singersRouter from "./singers.js";

const router = Router({ mergeParams: true });

// endpoints for songs routes

//get song list
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.song.findMany({});
    res.status(200).json({ songs: result, ok: true });
  })
);

//Get Songs List by album Id
router.get(
  "/",
  errorChecked(async (req, res) => {
    const songs = await prisma.song.findMany({
      where: { albumId: Number(req.params.albumIdFromParams) },
    });
    res.status(200).json(songs);
  })
);



//get one song
router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const song = await prisma.song.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    res.status(200).json(song);
  })
);

//create a new song
router.post(
  "/",
  errorChecked(async (req, res) => {
    const newSong = await prisma.song.create({ data: req.body });
    res.status(200).json({ newSong, ok: true });
  })
);

//update song
router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;

    const updatedSong = await prisma.song.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedSong);
  })
);

//delete song
router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedSong = await prisma.song.delete({
      where: { id: Number(id) },
    });
    res.status(200).json(deletedSong);
  })
);



router.use("/:songIdFromParams/singers", singersRouter);
export default router;

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
    res.status(200).json({ status: "OK", songs: result });
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
    if (!song) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Canción no encontrado" });
    }
    res.status(200).json({ status: "OK", song });
  })
);

//create a new song
router.post(
  "/",
  errorChecked(async (req, res) => {
    const { title, duration, albumId } = req.body;
    const song = await prisma.album.findUnique({
      where: { id: Number(albumId) },
    });
    const newSong = await prisma.song.create({ 
      data: {
        title,
        duration: Number(duration),
        albumId: Number(albumId),
      }
    });
    if (!song) {
      return null;
    }
    if (!newSong) {
      return res
        .status(400)
        .json({
          status: "FAILED",
          error:
            "No se ha podido crear la nueva canción. Revise los parámetros requeridos",
        });
    }
    res.status(201).json({ status: "OK", newSong });
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
    if (!updatedSong) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Canción no encontrado" });
    }

    res.status(200).json({ status: "OK", updatedSong });
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
    if (!deletedSong) {
      return res.status(404).json({ error: "Canción no encontrado" });
    }

    res.status(200).json({ status: "OK", deletedSong });
  })
);



router.use("/:songIdFromParams/singers", singersRouter);
export default router;

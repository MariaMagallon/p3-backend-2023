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
    const album = await prisma.album.findUnique({
      where: { id: Number(req.params.albumIdFromParams) }
    });
    if(!album){
      return res
        .status(404)
        .json({ status: "FAILED", error: "Album not found" });
    }
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
    const album = await prisma.album.findUnique({
      where: { id: Number(req.params.albumIdFromParams) },
    });
    if(!album){
      return res
        .status(404)
        .json({ status: "FAILED", error: "Album not found" });
    }
    const newSong = await prisma.song.create({ 
      data: {
        ...req.body,
        albumId: Number(req.params.albumIdFromParams),
      }
    });
    if (!newSong) {
      return res
        .status(400)
        .json({
          status: "FAILED",
          error:
            "Couldn't create new song. Please check required parameters in body",
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
        .json({ status: "FAILED", error: "Song not found" });
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
      return res.status(404).json({ error: "Song not found" });
    }

    res.status(200).json({ status: "OK", deletedSong });
  })
);



router.use("/:songIdFromParams/singers", singersRouter);
export default router;

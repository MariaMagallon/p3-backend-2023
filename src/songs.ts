import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked, validateIdParam, validateSongParams } from "./utils.js";

const router = Router({ mergeParams: true });

// endpoints for songs routes

//genera conflicte amb songs oaf an album i songs of a singer. Suposo que es perque tenen el mateix path (volia fer ús del router)

//get song list
/* router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.song.findMany({});
    res.status(200).json({ status: "OK", songs: result });
  })
); */

//get one song
router.get(
  "/:id",
  validateIdParam(),
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const song = await prisma.song.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (!song) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Song not found" });
    }
    res.status(200).json({ status: "OK", song });
  })
);

//create a new song 
// path => /songs (no se si hauria de dependre de album i singer). Volia fer que depengues de les entitats pares com el cas album-genre on si puc
//agafar el parametre id req.params i no com ho he hagut de fer en aquest cas de req.body
router.post(
  "/",
  validateSongParams(),
  errorChecked(async (req, res) => {
    const album = await prisma.album.findUnique({
      where: { id: Number(req.body.albumId) },
    });
    if (!album) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Album not found" });
    }
    const singer = await prisma.singer.findUnique({
      where: { id: Number(req.body.singerId) },
    });
    if (!singer) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Singer not found" });
    }
    const newSong = await prisma.song.create({
      data: {
        ...req.body,
        albumId: Number(req.body.albumId),
        singerId: Number(req.body.singerId),
      },
    });
    if (!newSong) {
      return res.status(400).json({
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
  validateIdParam(),
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
  validateIdParam(),
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedSong = await prisma.song.delete({
      where: { id: Number(id) },
    });
    if (!deletedSong) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Song not found" });
    }
    res.status(200).json({ status: "OK", deletedSong });
  })
);

//Get Songs List by album Id
router.get(
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
    const songs = await prisma.song.findMany({
      where: { albumId: Number(req.params.albumIdFromParams) },
    });
    res.status(200).json(songs);
  })
);

//Get Songs List by singer Id
router.get(
  "/",
  errorChecked(async (req, res) => {
    const singer = await prisma.singer.findUnique({
      where: { id: Number(req.params.singerIdFromParams) },
    });
    if(!singer){
      return res
        .status(404)
        .json({ status: "FAILED", error: "Singer not found" });
    }
    const songs = await prisma.song.findMany({
      where: { singerId: Number(req.params.singerIdFromParams) },
    });
    res.status(200).json(songs);
  })
);
export default router;

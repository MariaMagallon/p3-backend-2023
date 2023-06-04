import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router({ mergeParams: true });;

// endpoints for singers routes

//get singer list
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.singer.findMany({});
    res.status(200).json({ status: "OK", singers: result });
  })
);

//get singers of a song
router.get(
  "/",
  errorChecked(async (req, res) => {
    const song = await prisma.song.findUnique({
      where: { id: Number(req.params.songIdFromParams) }
    });
    if(!song){
      return res
        .status(404)
        .json({ status: "FAILED", error: "Song not found" });
    }
    const singers = await prisma.singer.findMany({
      where: { songId: Number(req.params.songIdFromParams) },
    });
    res.status(200).json(singers);
  })
);

//get one singer by ID
router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const singer = await prisma.singer.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (!singer) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Interprete no encontrado" });
    }
    res.status(200).json({status: "OK", singer});
  })
);

//create a new singer
router.post(
  "/",
  errorChecked(async (req, res) => {
    const { fullName, nacionality, songId } = req.body;
    const song = await prisma.song.findUnique({
      where: { id: Number(songId) },
    });
    if (!song) {
      return res
      .status(404)
      .json({ status: "FAILED", error: "Song not found" });
    }
    const newSinger = await prisma.singer.create({ 
      data: {
        fullName,
        nacionality,
        songId: Number(songId),
      }
    });
    if (!newSinger) {
      return res
        .status(400)
        .json({
          status: "FAILED",
          error:
            "Couldn't create new singer. Please check required parameters in body",
        });
    }
    res.status(201).json({ status: "OK", newSinger });
  })
);

//update singer
router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const updatedSinger = await prisma.singer.update({
      where: { id: Number(id) },
      data: req.body,
    });
    if (!updatedSinger) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Singer not found" });
    }

    res.status(200).json({ status: "OK", updatedSinger });
  })
);

//delete singer
router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedSinger = await prisma.singer.delete({
      where: { id: Number(id) },
    });
    if (!deletedSinger) {
      return res.status(404).json({ error: "Singer not found" });
    }

    res.status(200).json({ status: "OK", deletedSinger });
  })
);


export default router;

import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router({ mergeParams: true });;

// endpoints for singers routes

//get singers of a song
router.get(
  "/",
  errorChecked(async (req, res) => {
    const songs = await prisma.singer.findMany({
      where: { songId: Number(req.params.songIdFromParams) },
    });
    res.status(200).json(songs);
  })
);

//get singers of a album
router.get(
  "/",
  errorChecked(async (req, res) => {
    const songs = await prisma.singer.findMany({
      where: { albumId: Number(req.params.albumIdFromParams) },
    });
    res.status(200).json(songs);
  })
);

//get singer list
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.singer.findMany({});
    res.status(200).json({ singers: result, ok: true });
  })
);

//get one singer
router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const singer = await prisma.singer.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    res.status(200).json(singer);
  })
);

//create a new singer
router.post(
  "/",
  errorChecked(async (req, res) => {
    const newSinger = await prisma.singer.create({ data: req.body });
    res.status(200).json({ newSinger, ok: true });
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
    res.status(200).json(updatedSinger);
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
    res.status(200).json(deletedSinger);
  })
);

export default router;

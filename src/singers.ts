import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked, validateIdParam, validateSingerParams } from "./utils.js";
const router = Router({ mergeParams: true });;
import songsRouter from "./songs.js";

// endpoints for singers routes

//get singer list
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.singer.findMany({});
    res.status(200).json({ status: "OK", singers: result });
  })
);

//get one singer by ID
router.get(
  "/:id",
  validateIdParam(),
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const singer = await prisma.singer.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (!singer) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Singer not found" });
    }
    res.status(200).json({status: "OK", singer});
  })
);

//create a new singer
router.post(
  "/",
  validateSingerParams(),
  errorChecked(async (req, res) => {
    const newSinger = await prisma.singer.create({ 
      data: 
        req.body    
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
  validateIdParam(),
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
  validateIdParam(),
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
router.use("/:singerIdFromParams/songs", songsRouter);
export default router;

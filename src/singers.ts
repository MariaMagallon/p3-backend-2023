import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router();

// endpoints for singers routes

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

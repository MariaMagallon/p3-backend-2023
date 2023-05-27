import { Router } from "express";
import prisma from "./prisma-client.js";

const router = Router();

// endpoints for singers routes

//get singer list
router.get("/", async (req, res, next) => {
  try {
    const result = await prisma.singer.findMany();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

//get one singer
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getSinger = await prisma.singer.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    res.json(getSinger);
  } catch (e) {
    next(e);
  }
});

//create a new singer
router.post("/", async (req, res, next) => {
  try {
    const { fullName, nacionality } = await req.body;
    const newSinger = await prisma.singer.create({
      data: {
        fullName,
        nacionality,
      },
    });
    res.status(200).json(newSinger);
  } catch (e) {
    next(e);
  }
});

//update singer
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedSinger = await prisma.singer.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedSinger);
  } catch (e) {
    next(e);
  }
});

//delete singer
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteSinger = await prisma.singer.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteSinger);
  } catch (e) {
    next(e);
  }
});

export default router;

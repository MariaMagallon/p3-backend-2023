import { Router } from "express";
import prisma from "./prisma-client.js";

const router = Router();

// endpoints for genres routes

//get genre list
router.get("/", async (req, res,next) => {
  try {
    const result = await prisma.genre.findMany();
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

//get one genre
router.get("/:id", async (req, res,next) => {
  try {
    const { id } = req.params;
    const getGenre = await prisma.genre.findUniqueOrThrow({
      where: { id: Number(id) }
    });
    res.json(getGenre);
  } catch (e) {
    next(e);
  }
});

//create a new genre
router.post("/", async (req, res,next) => {
  try {
    const { name, singer } = await req.body;
    const newUser = await prisma.genre.create({
        //or I can just send req.body
      data: {
        name,
        singer,
      },
    });
    res.status(200).send(newUser);
  } catch (e) {
    next(e)
  }
});

//update genre
router.put("/:id", async (req, res,next) => {
  try {
    const { id } = req.params;
    const updateGenre = await prisma.genre.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });
    res.json(updateGenre);
  } catch (e) {
    next(e)
  }
});

//delete genre
router.delete("/:id", async (req, res,next) => {
  try {
    const { id } = req.params;
    const deleteGenre = await prisma.genre.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(deleteGenre);
  } catch (e) {
    next(e)
  }
});

export default router;


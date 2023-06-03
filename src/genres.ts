import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";
import albumsRouter from "./albums.js";

const router = Router({ mergeParams: true });

// endpoints for genres routes

//get genre list
router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.genre.findMany({});
    res.status(200).json({ status: "OK", genres: result });
  })
);

//get one genre by ID
router.get(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    if (!genre) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Género no encontrado" });
    }
    res.status(200).json({ status: "OK", genre });
  })
);

//create a new genre
router.post(
  "/",
  errorChecked(async (req, res) => {
    const newGenre = await prisma.genre.create({ data: req.body });
    if (!newGenre.name && newGenre.name === "") {
      return res
        .status(400)
        .json({
          status: "FAILED",
          error:
            "Falta o esta vacía la propiedad requerida en el body: 'name' ",
        });
    }
    res.status(201).json({ status: "OK", newGenre });
  })
);

//update genre
router.put(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedGenre = await prisma.genre.update({
      where: { id: Number(id) },
      data: { name },
    });
    if (!updatedGenre) {
      return res
        .status(404)
        .json({ status: "FAILED", error: "Género no encontrado" });
    }

    res.status(200).json({ status: "OK", updatedGenre });
  })
);

//delete genre
router.delete(
  "/:id",
  errorChecked(async (req, res) => {
    const { id } = req.params;
    const deletedGenre = await prisma.genre.delete({
      where: { id: Number(id) },
    });

    if (!deletedGenre) {
      return res.status(404).json({ error: "Género no encontrado" });
    }

    res.status(200).json({ status: "OK", deletedGenre });
  })
);

router.use("/:genreIdFromParams/albums", albumsRouter);

export default router;

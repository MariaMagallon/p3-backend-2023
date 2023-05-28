import { Router } from "express";
import prisma from "./prisma-client.js";
import { errorChecked } from "./utils.js";

const router = Router({ mergeParams: true });

// endpoints for albums routes

//get albums list of a genre
router.get(
  "/",
  errorChecked(async (req, res) => {
    const albums = await prisma.album.findMany({
      where: { genreId: Number(req.params.genreIdFromParams) },
    });
    res.status(200).json(albums);
  })
);

export default router;

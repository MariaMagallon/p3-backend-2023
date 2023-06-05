import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import singersRouter from "./singers.js";
import genresRouter from "./genres.js";
import albumsRouter from "./albums.js";
import songsRouter from "./songs.js";

import { defaultErrorHandler } from "./utils.js";

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/singers", singersRouter);
app.use("/genres", genresRouter);
app.use("/albums", albumsRouter);
app.use("/songs", songsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use(defaultErrorHandler);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});

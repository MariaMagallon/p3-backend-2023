import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import singers from "./singers.js"

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/singers", singers);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`listening on port : ${port}`);
});
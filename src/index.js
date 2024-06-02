import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ORIGIN } from "../index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

// middlewares

app.use(logger("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// routes
import apiRouter from "./routes/index.js";
app.use("/api", apiRouter);

export default app;

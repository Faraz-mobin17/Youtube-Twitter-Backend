import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./utils/logger.utils.js";
import cors from "cors";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ORIGIN } from "../index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

const morganFormat = ":method :url :status :response-time ms";

// middlewares

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// routes
import apiRouter from "./routes/index.js";
app.use("/api", apiRouter);

export default app;

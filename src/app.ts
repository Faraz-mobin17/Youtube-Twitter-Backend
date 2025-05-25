import express from "express";
import type { Application, Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "./utils/logger.js";
import cors from "cors";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "./config/env.js";
import apiRouter from "./routes/index.js";
import { routeNotFound } from "./utils/errors/routeNotFound.js";
import {
  appErrorHandler,
  genericErrorHandler,
} from "./middlewares/error-middleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function createApp(): Application {
  const app: Application = express();

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
      origin: env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));

  app.use(express.static(path.join(__dirname, "public")));
  app.use(cookieParser());

  // routes
  app.use("/api", apiRouter);

  // error handling
  app.use(appErrorHandler);
  app.use(genericErrorHandler);

  app.all(
    "*",
    routeNotFound as (req: Request, res: Response, next: NextFunction) => void
  );
  return app;
}

import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { ORIGIN } from "./index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);
// view engine setup
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// routes
import usersRouter from "./src/routes/v1/users.route.js";
// import videoRouter from "./src/routes/v1/videos.route.js";

app.use("/api/v1/users", usersRouter);
// app.use("/api/v1/videos", videoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;

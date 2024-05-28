import express from "express";
import {
  commentRouter,
  tweetRouter,
  userRouter,
  videoRouter,
} from "./v1/index.js";

const apiRouter = express.Router();

apiRouter.use("/v1/users", userRouter);
apiRouter.use("/v1/videos", videoRouter);
apiRouter.use("/v1/tweets", tweetRouter);
apiRouter.use("/v1/comments", commentRouter);

export default apiRouter;

import express from "express";
import {
  commentRouter,
  tweetRouter,
  userRouter,
  videoRouter,
  likeRouter,
  healthcheckRouter,
  subscriptionRouter,
} from "./v1/index.js";

const apiRouter = express.Router();

apiRouter.use("/v1/users", userRouter);
apiRouter.use("/v1/videos", videoRouter);
apiRouter.use("/v1/tweets", tweetRouter);
apiRouter.use("/v1/comments", commentRouter);
apiRouter.use("/v1/likes", likeRouter);
apiRouter.use("/v1/ping", healthcheckRouter);
apiRouter.use("/v1/subscription", subscriptionRouter);
export default apiRouter;

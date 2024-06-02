import express from "express";
import { verifyJWT } from "../../middlewares/index.js";
import { LikeController } from "../../controllers/index.js";

const router = express.Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// TODO: GET ROUTES
router.route("/videos").get(LikeController.getLikedVideos);
// TODO: POST ROUTES
router.route("/toggle/v/:videoId").post(LikeController.toggleVideoLike);
router.route("/toggle/c/:commentId").post(LikeController.toggleCommentLike);
router.route("/toggle/t/:tweetId").post(LikeController.toggleTweetLike);

export default router;

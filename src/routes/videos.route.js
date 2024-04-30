import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { VideoController } from "../controllers/videos.controller.js";
const router = express.Router();

router.get("/videos/:id", verifyJWT, VideoController.getVideoById);
router.get("/videos", verifyJWT, VideoController.getAllVideos);
router.delete("/videos/:id", VideoController.deleteVideo);

export default router;

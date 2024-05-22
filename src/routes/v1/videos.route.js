import express from "express";
import { Auth, verifyPremium } from "../middlewares/index.js";
import { videoController } from "../../controllers/index.js";
import apicache from "apicache";
let cache = apicache.middleware;

const router = express.Router();

router.get("/", cache("5 minutes"), videoController.getAllVideos);
router.get("/:id", cache("5 minutes"), videoController.getVideoById);
router.post(
  "/",
  upload.fileds([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.delete("/:id", [
  Auth.verifyJWT,
  verifyPremium.verifyPremiumUser,
  videoController.deleteVideo,
]);
router.post("/:id/restore", [
  Auth.verifyJWT,
  verifyPremium.verifyPremiumUser,
  videoController.restoreVideo,
]);

export default router;

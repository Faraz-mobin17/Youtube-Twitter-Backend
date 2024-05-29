import express from "express";
import { AuthService, upload } from "../../middlewares/index.js";
import { videoController } from "../../controllers/index.js";

import apicache from "apicache";
let cache = apicache.middleware;

const router = express.Router();

router.use(AuthService.verifyJWT); // apply jwt awt to all routes

// TODO: GET ROUTES

router.route("/").get(cache("5 minutes"), videoController.getAllVideos);
router.route("/:videoId").get(cache("5 minutes"), videoController.getVideoById);

// TODO: POST ROUTES

router.route("/").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  videoController.publishAVideo
);

// TODO: PATCH ROUTES

router
  .route("/:videoId")
  .patch(multer.upload.single("thumbnail"), videoController.updateVideo);

router
  .route("/toggle/publish/:videoId")
  .patch(videoController.togglePublishStatus);

// TODO: DELETE ROUTES

router.route("/:videoId").delete(videoController.deleteVideo);

export default router;

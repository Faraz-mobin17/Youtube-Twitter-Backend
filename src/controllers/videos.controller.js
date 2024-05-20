import { VideoService } from "../services/video.service.js";
import { VideoRepository } from "../repositories/video.repository.js";
import { ApiResponse, ApiError } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import db from "../db/connection.db.js";

const Videos = new VideoService(new VideoRepository(db));

const deleteVideo = asyncHandler(async (req, res) => {
  const videoId = Number(req.params.videoId);
  const userId = Number(req.params.userId);

  if (req.user.is_premium) {
    softDeleteVideo(videoId, userId);
    return;
  }

  const videos = await Videos.deleteVideo(videoId, userId);

  if (!videos || videos.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video Not Found");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, videos, "Video deleted successfully")
    );
});

const softDeleteVideo = asyncHandler(async (videoId, userId) => {
  const videos = await Videos.softDeleteVideo(videoId, userId);

  if (!videos || videos.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video Not Found");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, videos, "Video deleted successfully")
    );
});

const restoreVideo = asyncHandler(async (req, res) => {
  const videoId = Number(req.params.id);
  const userId = Number(req.user.id);

  if (req.user.is_premium) {
    await Videos.restoreVideo(videoId, userId);
    return res
      .status(HttpStatusCodes.OK)
      .json(
        new ApiResponse(HttpStatusCodes.OK, null, "Video restored successfully")
      );
  } else {
    console.log("Video not restored");
  }
});

export { deleteVideo, restoreVideo };

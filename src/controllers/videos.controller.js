import { VideoService } from "../services/video.service.js";
import { VideoRepository } from "../repositories/video.repository.js";
import { ApiResponse, ApiError } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import db from "../db/connection.db.js";

const Videos = new VideoService(new VideoRepository(db));

const getAllVideos = asyncHandler(async (req, res) => {
  const video = await Videos.getAllVideos();
  if (!video || video.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "video not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, video, "Videos fetched successfully")
    );
});

const getAllVideosForChannel = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  const video = await Videos.getAllVideosForChannel(
    page,
    limit,
    query,
    sortBy,
    sortType,
    userId
  );
  if (!video || video.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, video, "Video fetched successfully")
    );
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId, userId } = req.params;
  const video = await Videos.getVideoById(videoId, userId);
  if (!video || video.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, video, "Video fetched successfully")
    );
});

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

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description, videoFile } = req.body;
  // TODO: get video, upload to cloudinary, create video
  const cloudinaryResponse = await cloudinary.uploader.upload(videoFile.path, {
    resource_type: "video",
    folder: "videos",
  });

  // Construct video data
  const videoData = {
    title: title,
    description: description,
    url: cloudinaryResponse.url,
    user_id: req.user.id, // Assuming the user's ID is available in the request
  };

  const published = await Videos.publishAVideo(videoData);
  if (!published || published.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_MODIFIED, "Video not published");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, published, "Video is published"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  getVideoById,
  deleteVideo,
  restoreVideo,
  getAllVideosForChannel,
};

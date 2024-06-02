import { VideoService } from "../services/video.service.js";
import { VideoRepository } from "../repositories/video.repository.js";
import { ApiResponse, ApiError } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../middlewares/index.js";
import db from "../db/connection.db.js";

const Videos = new VideoService(new VideoRepository(db));

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
  const videos = await Videos.getAllVideos(
    page,
    limit,
    query,
    sortBy,
    sortType,
    userId
  );
  if (!videos || videos.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Videos not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, videos, "Videos fetched successfully")
    );
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user?.id;
  //TODO: get video by id
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
  //TODO: delete video
  const { videoId } = req.params;
  const userId = req.user?.id;
  const video = await Videos.getVideoById(videoId, userId);
  if (!video || video.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video not found");
  }

  const deletedVideo = await Videos.deleteVideo(videoId, userId);
  if (!deletedVideo) {
    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Error deleting video"
    );
  }
  // delete from cloudinary
  const videoFile = video[0].videoFile;
  const thumbnail = video[0].thumbnail;

  await deleteFromCloudinary(videoFile.public_id);
  await deleteFromCloudinary(thumbnail.public_id);

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, null, "Video deleted successfully")
    );
});

const restoreVideo = asyncHandler(async (req, res) => {});

const publishAVideo = asyncHandler(async (req, res) => {
  // TODO: get video, upload to cloudinary, create video record in db

  const { title, description } = req.body;
  const videoLocalFilePath = req.files?.videoFile[0];
  const thumbnailLocalFilePath = req.files?.thumbnail[0];

  if (!videoLocalFilePath || !thumbnailLocalFilePath) {
    throw new ApiError(
      HttpStatusCodes.BAD_REQUEST,
      "Video and thumbnail required"
    );
  }

  const videoFile = await uploadOnCloudinary(videoLocalFilePath);
  const thumbnailFile = await uploadOnCloudinary(thumbnailLocalFilePath);

  if (!videoFile || !thumbnailFile) {
    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Error uploading video/thumbnail"
    );
  }

  const videoDetails = {
    user_id: req.user?.id,
    videoFile: {
      url: videoFile?.url,
      public_id: videoFile.public_id,
    },
    thumbnail: {
      url: thumbnailFile?.url,
      public_id: thumbnailFile.public_id,
    },
    title,
    description,
    duration: videoFile.duration,
    isPublished: false,
  };

  const newVideo = await Videos.publishAVideo(videoDetails);

  if (!newVideo) {
    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Error publishing video"
    );
  }

  return res
    .status(HttpStatusCodes.CREATED)
    .json(
      new ApiResponse(
        HttpStatusCodes.CREATED,
        newVideo,
        "Video published successfully"
      )
    );
});

const updateVideo = asyncHandler(async (req, res) => {
  //TODO: update video details like title, description, thumbnail
  const { title, description } = req.body;
  const { videoId } = req.params;
  const userId = req.user?.id;
  const video = await Videos.getVideoById(videoId, userId);

  if (!video || video.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video not found");
  }

  // delete old thumbnail and upload new thumbnail
  const thumbnailLocalFilePath = req.files?.thumbnail[0];

  if (!thumbnailLocalFilePath) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "Thumbnail required");
  }

  const thumbnailFile = await uploadOnCloudinary(thumbnailLocalFilePath);

  if (!thumbnailFile) {
    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Error uploading thumbnail"
    );
  }

  const oldThumbnail = video[0].thumbnail;

  await deleteFromCloudinary(oldThumbnail.public_id);

  // update video details
  const updatedVideo = await Videos.updateVideo(videoId, title, description);
  if (!updatedVideo) {
    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Error updating video"
    );
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(
        HttpStatusCodes.OK,
        updatedVideo,
        "Video updated successfully"
      )
    );
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const userId = req.user?.id;

  if (!videoId) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "Video id required");
  }

  const video = await Videos.getVideoById(videoId, userId);

  if (!video || video.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video not found");
  }

  const isPublished = video[0].isPublished;

  const updatedVideo = await Videos.togglePublishStatus(videoId, !isPublished);

  if (!updatedVideo) {
    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Error updating video"
    );
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(
        HttpStatusCodes.OK,
        updatedVideo,
        "Video publish status updated successfully"
      )
    );
});

export {
  getAllVideos,
  getVideoById,
  deleteVideo,
  restoreVideo,
  publishAVideo,
  updateVideo,
  togglePublishStatus,
};

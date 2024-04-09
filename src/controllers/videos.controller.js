import { ApiResponse, ApiError } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";

class VideoController {
  static getAllVideos = asyncHandler(async (req, res) => {
    const { title } = req.body;
    if (!title) {
      throw new ApiError("title is required");
    }
    const video = await VideoModel.getAllVideos(title);
    return res
      .status(HttpStatusCodes.OK)
      .json(
        new ApiResponse(
          HttpStatusCodes.OK,
          video,
          "Videos feteched successfully"
        )
      );
  });

  static getVideoById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw new ApiError("id required");
    }
    const video = await Video.findById("videos", { user_id: id });
    return res
      .status(HttpStatusCodes.OK)
      .json(
        new ApiResponse(
          HttpStatusCodes.OK,
          video,
          "Videos feteched successfully"
        )
      );
  });

  static publishVideo = asyncHandler(async (req, res) => {
    // TODO: complete this fn
  });

  static updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: update video details like title, description, thumbnail
    const { title, description, thumbnail } = req.body;
    if (!title || !description || !thumbnail) {
      throw new ApiError(400, "need title , description and thumbnail");
    }

    const video = await Video.findById("videos", { user_id: videoId });
    if (!video) {
      throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video not found");
    }

    const updateVideo = await Video.update("videos", req.body);
    return res
      .status(HttpStatusCodes.OK)
      .json(
        new ApiResponse(
          HttpStatusCodes.OK,
          updateVideo,
          "Video updated Successfully"
        )
      );
  });

  static deleteVideo = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
      throw new ApiError(400, "Video Id required");
    }

    const videoExists = await Video.findById("videos", { id });
    if (!videoExists) {
      throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video not found");
    }

    const deleteVideo = await Video.remove("videos", { id });
    if (!deleteVideo) {
      throw new ApiError(HttpStatusCodes.NOT_MODIFIED, "Video not deleted");
    }
    return res
      .status(HttpStatusCodes.OK)
      .json(
        new ApiResponse(
          HttpStatusCodes.OK,
          deleteVideo,
          "Video deleted Successfully"
        )
      );
  });

  static togglePublishStatus = asyncHandler(async (req, res) => {});
}
export { VideoController };

import { ApiResponse, ApiError } from "../utils/ApiHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import db from "../db/connection.db.js";
import { HttpStatusCodes } from "../utils/CONSTANTS.js";
const getAllVideos = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    throw new ApiError("title is required");
  }
  const query = `SELECT * FROM Videos WHERE MATCH(title) AGAINST(? IN NATURAL LANGUAGE MODE)`;
  const value = [title];
  const [rows] = await db.query(query, value);
  if (rows.length === 0) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "Videos not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, rows, "Videos feteched successfully")
    );
});

const getVideoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("id required");
  }
  const query = `SELECT * FROM Videos WHERE user_id = ?`;
  const user_id = id;
  const [rows] = await db.query(query, user_id);
  if (rows.length === 0) {
    throw new ApiError(400, "Videos not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, rows, "Videos feteched successfully")
    );
});

const publishVideo = asyncHandler(async (req, res) => {});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  const { title, description, thumbnail } = req.body;
  if (!title || !description || !thumbnail) {
    throw new ApiError(400, "need title , description and thumbnail");
  }
  //   check if video exists or not
  const videoExistsQuery = `SELECT user_id FROM Vidoes WHERE user_id = ?`;
  const videoValues = [videoId];
  const [videoExistsRow] = await db.query(videoExistsQuery, videoValues);
  if (videoExistsRow.length === 0) {
    throw new ApiError(400, "Video doesnt exists");
  }
  const query = `UPDATE Videos SET title = ? description = ? thumbnail = ?`;
  const values = [title, description, thumbnail];
  const [rows] = await db.query(query, values);
  if (rows.length === 0) {
    throw new ApiError(400, "Video not updated");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, rows, "Video updated Successfully")
    );
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Video Id required");
  }

  //   check if video exists or not
  const videoExistsQuery = `SELECT user_id FROM Videos WHERE id = ?`;
  const videoValues = [id];
  const [videoExistsRow] = await db.query(videoExistsQuery, videoValues);
  if (videoExistsRow.length === 0) {
    throw new ApiError(400, "Video doesn't exists");
  }

  const query = `DELETE FROM Videos WHERE id = ?`;
  const values = [id];
  const [rows] = await db.query(query, values);
  if (rows.length === 0) {
    throw new ApiError(400, "Video not deleted");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, rows, "Video deleted Successfully")
    );
});

const togglePublishStatus = asyncHandler(async (req, res) => {});

export {
  getAllVideos,
  getVideoById,
  deleteVideo,
  updateVideo,
  publishVideo,
  togglePublishStatus,
};

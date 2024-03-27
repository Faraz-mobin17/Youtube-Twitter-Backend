import { ApiResponse, ApiError } from "../utils/ApiHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import db from "../db/connection.db.js";
import { HttpStatusCodes } from "../utils/CONSTANTS.js";
asyncHandler(async function getAllVideos(req, res) {
  const { title } = req.body;
  if (!title) {
    throw new ApiError("title is required");
  }
  const query = "SELECT * from Videos";
  const [rows] = await db.query(query);
  if (rows.affectedRows === 0) {
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json(new ApiError(HttpStatusCodes.NOT_FOUND, "videos not found"));
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, rows, "Videos feteched successfully")
    );
});

asyncHandler(async function getVideoById(req, res) {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("id required");
  }
  const query = `SELECT * FROM Videos WHERE user_id = ?`;
  const user_id = id;
  const [rows] = await db.query(query, user_id);
  if (rows.affectedRows === 0) {
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json(new ApiError(HttpStatusCodes.NOT_FOUND, "videos not found"));
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, rows, "Videos feteched successfully")
    );
});

asyncHandler(async function publishVideo(req, res) {});

asyncHandler(async function updateVideo(req, res) {
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
  if (videoExistsRow.affectedRows === 0) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(new ApiError(HttpStatusCodes.BAD_REQUEST, "Video doesn't exists"));
  }
  const query = `UPDATE Videos SET title = ? description = ? thumbnail = ?`;
  const values = [title, description, thumbnail];
  const [rows] = await db.query(query, values);
  if (rows.affectedRows === 0) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(new ApiError(HttpStatusCodes.BAD_REQUEST, "Video not updated"));
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, rows, "Video updated Successfully")
    );
});

asyncHandler(async function deleteVideo(req, res) {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError("Video Id required");
  }
  //   check if video exists or not
  const videoExistsQuery = `SELECT user_id FROM Vidoes WHERE user_id = ?`;
  const videoValues = [videoId];
  const [videoExistsRow] = await db.query(videoExistsQuery, videoValues);
  if (videoExistsRow.affectedRows === 0) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(new ApiError(HttpStatusCodes.BAD_REQUEST, "Video doesn't exists"));
  }
  const query = `DELETE FROM Videos WHERE id = ?`;
  const values = [videoId];
  const [rows] = await db.query(query, values);
  if (rows.affectedRows === 0) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(new ApiError(HttpStatusCodes.BAD_REQUEST, "Video not deleted"));
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, rows, "Video deleted Successfully")
    );
});

asyncHandler(async function togglePublishStatus(req, res) {});

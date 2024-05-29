import { ApiError, ApiResponse } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { CommentRepository } from "../repositories/comment.repository.js";
import { CommentService } from "../services/comment.service.js";
import db from "../db/connection.db.js";
import { VideoService } from "../services/video.service.js";
import { VideoRepository } from "../repositories/video.repository.js";

const Comment = new CommentService(new CommentRepository(db));
const Video = new VideoService(new VideoRepository(db));

const getVideoComments = asyncHandler(async (req, res) => {
  const videoId = req.params?.videoId;
  console.log(videoId);
  const { page = 1, limit = 10 } = req.query;

  const video = await Video.getVideoById(videoId, req.user?.id);

  if (!video) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video not found");
  }
  console.log("I'm here", videoId, page, limit);
  const comments = await Comment.getVideoComments(videoId, page, limit);

  if (!comments || comments.length === 0) {
    throw new ApiError(
      HttpStatusCodes.NOT_FOUND,
      "No comments found for this video"
    );
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(
        HttpStatusCodes.OK,
        comments,
        "Comments fetched successfully"
      )
    );
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const videoId = req.params?.videoId;

  const userId = req.user?.id;

  const { content } = req.body;

  const video = await Video.getVideoById(videoId, userId);

  if (!video) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Video not found");
  }

  if (!content) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Comment required");
  }

  const comment = await Comment.addComment(content, videoId, userId);

  if (!comment || comment.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Comment not found");
  }

  return res
    .status(HttpStatusCodes.CREATED)
    .json(
      new ApiResponse(
        HttpStatusCodes.CREATED,
        comment,
        "Comment created successfully"
      )
    );
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params; // Assuming the comment ID is passed as a URL parameter

  const { content } = req.body; // The new data for the comment

  const userId = req.user?.id;

  if (!content) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "No data provided");
  }

  const comment = await Comment.getCommentById(commentId, userId);

  if (!comment) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Comment not found");
  }

  const updatedComment = await Comment.updateComment(
    userId,
    commentId,
    content
  );

  if (!updatedComment) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Comment not found");
  }

  res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(
        HttpStatusCodes.OK,
        updatedComment,
        "Comment updated successfully"
      )
    );
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params; // Assuming the comment ID is passed as a URL parameter
  const userId = req.user?.id;

  const comment = await Comment.getCommentById(commentId, userId);

  if (!comment) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Comment not found");
  }

  const deleted = await Comment.deleteComment(commentId, userId);

  if (!deleted) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Comment not found");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, null, "Comment deleted successfully")
    );
});

export { getVideoComments, addComment, updateComment, deleteComment };

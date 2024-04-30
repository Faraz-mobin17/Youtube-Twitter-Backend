import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { CommentRepository } from "../repositories/comment.repository.js";
import { CommentService } from "../services/comment.service.js";
import db from "../db/connection.db.js";

const Comment = new CommentService(new CommentRepository(db));

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
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
  } catch (error) {
    throw new ApiError(
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to fetch comments"
    );
  }
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  if (!req.body) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Comment required");
  }
  const comment = await Comment.addComment(req.body);
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
  const commentData = req.body; // The new data for the comment

  if (!commentData) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "No data provided");
  }

  const updatedComment = await Comment.updateComment(commentId, commentData);
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
  const deleted = await Comment.deleteComment(commentId);
  if (!deleted) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Comment not found");
  }
  res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, null, "Comment deleted successfully")
    );
});

export { getVideoComments, addComment, updateComment, deleteComment };

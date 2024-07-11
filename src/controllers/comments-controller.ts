import { Request, Response } from "express";
import { ApiError, ApiResponse } from "../utils/api-handler.js";
import { asyncHandler } from "../utils/async-handler.js";
import { CommentService, VideoService } from "../services/index.js";
import { StatusCodes } from "http-status-codes";

const getCommentById = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params; // Assuming the comment ID is passed as a URL parameter

  const userId = req.user?.id;

  const comment = await CommentService.getCommentById();

  if (!comment) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
  }

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, comment, "Comment fetched successfully")
    );
});

const getVideoComments = asyncHandler(async (req: Request, res: Response) => {
  const videoId = req.params?.videoId;
  console.log(videoId);
  const { page = 1, limit = 10 } = req.query;

  const video = await VideoService.getVideoById(videoId, req.user?.id);

  if (!video) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Video not found");
  }
  console.log("I'm here", videoId, page, limit);
  const comments = await CommentService.getVideoComments();

  if (!comments || comments.length === 0) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "No comments found for this video"
    );
  }

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, comments, "Comments fetched successfully")
    );
});

const addComment = asyncHandler(async (req: Request, res: Response) => {
  // TODO: add a comment to a video
  const videoId = req.params?.videoId;

  const userId = req.user?.id;

  const { content } = req.body as ReadableStream<Uint8Array> | any;

  const video = await VideoService.getVideoById(videoId, userId);

  if (!video) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Video not found");
  }

  if (!content) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Comment required");
  }

  const comment = await CommentService.addComment();

  if (!comment || comment.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
  }

  return res
    .status(StatusCodes.CREATED)
    .json(
      new ApiResponse(
        StatusCodes.CREATED,
        comment,
        "Comment created successfully"
      )
    );
});

const updateComment = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params; // Assuming the comment ID is passed as a URL parameter

  const { content } = req.body; // The new data for the comment

  const userId = req.user?.id;

  if (!content) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "No data provided");
  }

  const comment = await CommentService.getCommentById();

  if (!comment) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
  }

  const updatedComment = await CommentService.updateComment();

  if (!updatedComment) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
  }

  res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(
        StatusCodes.OK,
        updatedComment,
        "Comment updated successfully"
      )
    );
});

const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  const { commentId } = req.params; // Assuming the comment ID is passed as a URL parameter
  const userId = req.user?.id;

  const comment = await CommentService.getCommentById();

  if (!comment) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
  }

  const deleted = await CommentService.deleteComment();

  if (!deleted) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Comment not found");
  }

  return res
    .status(StatusCodes.OK)
    .json(
      new ApiResponse(StatusCodes.OK, null, "Comment deleted successfully")
    );
});

export {
  getVideoComments,
  addComment,
  updateComment,
  deleteComment,
  getCommentById,
};

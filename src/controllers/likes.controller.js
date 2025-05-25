import { ApiError, ApiResponse } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { LikeRepository } from "../repositories/like.repository.js";
import { LikeService } from "../services/like-service.js";
import { VideoService } from "../services/video-service.js";
import { VideoRepository } from "../repositories/video.repository.js";
import { TweetService } from "../services/tweet-service.js";
import { TweetRepository } from "../repositories/tweet.repository.js";
import { CommentService } from "../services/comment-service.js";
import { CommentRepository } from "../repositories/comment.repository.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import db from "../db/connection.db.js";

const Likes = new LikeService(new LikeRepository(db));
const Video = new VideoService(new VideoRepository(db));
const Comment = new CommentService(new CommentRepository(db));
const Tweet = new TweetService(new TweetRepository(db));

const toggleVideoLike = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  console.log(videoId, req.user?.id);
  // TODO: toggle like video
  const userId = req.user?.id;
  const video = await Video.getVideoById(videoId, req.user?.id);
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  const like = await Likes.toggleVideoLike(videoId, userId);
  if (!like) {
    throw new ApiError(400, "Failed to like video");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(200, "Video liked"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user?.id;
  const comment = await Comment.getCommentById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }
  const like = await Likes.toggleCommentLike(commentId, userId);
  if (!like) {
    throw new ApiError(400, "Failed to like comment");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(200, "Comment liked"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const tweetId = req.params.tweetId;
  const userId = req.user?.id;
  const tweet = await Tweet.getTweetById(tweetId);
  if (!tweet) {
    throw new ApiError(404, "Tweet not found");
  }
  const like = await Likes.toggleTweetLike(tweetId, userId);
  if (!like) {
    throw new ApiError(400, "Failed to like tweet");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(200, "Tweet liked"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const likedVideos = await Likes.getLikedVideos(userId);
  if (!likedVideos) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "No liked videos found");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(
        HttpStatusCodes.OK,
        likedVideos,
        "Liked videos fetched successfully"
      )
    );
});

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };

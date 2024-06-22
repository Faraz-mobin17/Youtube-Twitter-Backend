import { TweetRepository } from "../repositories/tweet.repository.js";
import { TweetService } from "../services/tweet-service.js";
import { ApiResponse, ApiError } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import db from "../db/connection.db.js";
const Tweet = new TweetService(new TweetRepository(db));

const getTweetById = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;

  const tweet = await Tweet.getTweetById(tweetId);
  if (!tweet) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Tweet not found");
  }
  res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, tweet, "Tweet fetched successfully")
    );
});

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  //TODO: create tweet
  if (!req.body) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "tweet required");
  }
  const tweets = await Tweet.createTweet(content, req?.user?.id);
  if (!tweets) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "tweet not found");
  }
  return res
    .status(HttpStatusCodes.CREATED)
    .json(
      new ApiResponse(
        HttpStatusCodes.CREATED,
        tweets,
        "Tweets Created Successfully"
      )
    );
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets

  const id = Number(req.params?.id);
  console.log(id);
  if (!id) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "User id not found");
  }
  const tweet = await Tweet.getUserTweets(id);
  if (!tweet || tweet.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "User tweet not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(
        HttpStatusCodes.OK,
        tweet,
        "User tweet fetched Successfully"
      )
    );
});

const updateTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  //TODO: update tweet
  if (!req.body) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Content required");
  }
  const tweet = await Tweet.updateTweet(content, req.params?.id);
  if (!tweet || tweet.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_MODIFIED, "Tweet not updated");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(
        HttpStatusCodes.OK,
        tweet,
        "Tweet content updated successfully"
      )
    );
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const id = Number(req.params?.id);
  if (!id) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "User id not found");
  }
  const tweet = await Tweet.deleteTweet(id);
  if (!tweet || tweet.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_MODIFIED, "Tweet not deleted");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, tweet, "Tweet deleted Successfully")
    );
});

export { createTweet, getUserTweets, updateTweet, deleteTweet, getTweetById };

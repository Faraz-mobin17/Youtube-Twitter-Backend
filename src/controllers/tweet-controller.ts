import { Request, Response } from "express";
import { TweetRepository } from "../repositories/tweet-repository.js";
import { TweetService } from "../services/tweet-service.js";
import { ApiResponse, ApiError } from "../utils/api-handler.js";
import { asyncHandler } from "../utils/async-handler.js";
import db from "../db/connection.db.js";
import { StatusCodes } from "http-status-codes";
const Tweet = new TweetService(new TweetRepository(db));

const getTweetById = asyncHandler(
  async (req: Request, res: Response): Promise<object> => {
    const { tweetId } = req.params;

    const tweet = await Tweet.getTweetById(tweetId);
    if (!tweet) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Tweet not found");
    }
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(StatusCodes.OK, tweet, "Tweet fetched successfully")
      );
  }
);

const createTweet = asyncHandler(
  async (req: Request, res: Response): Promise<object> => {
    const { content } = req.body;
    //TODO: create tweet
    if (!req.body) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "tweet required");
    }
    const tweets = await Tweet.createTweet(content, req?.user?.id);
    if (!tweets) {
      throw new ApiError(StatusCodes.NOT_FOUND, "tweet not found");
    }
    return res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(
          StatusCodes.CREATED,
          tweets,
          "Tweets Created Successfully"
        )
      );
  }
);

const getUserTweets = asyncHandler(
  async (req: Request, res: Response): Promise<object> => {
    // TODO: get user tweets

    const id = Number(req.params?.id);
    console.log(id);
    if (!id) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User id not found");
    }
    const tweet = await Tweet.getUserTweets(id);
    if (!tweet || tweet.length === 0) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User tweet not found");
    }
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          tweet,
          "User tweet fetched Successfully"
        )
      );
  }
);

const updateTweet = asyncHandler(
  async (req: Request, res: Response): Promise<object> => {
    const { content } = req.body;
    //TODO: update tweet
    if (!req.body) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Content required");
    }
    const tweet = await Tweet.updateTweet(content, req.params?.id);
    if (!tweet || tweet.length === 0) {
      throw new ApiError(StatusCodes.NOT_MODIFIED, "Tweet not updated");
    }
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          tweet,
          "Tweet content updated successfully"
        )
      );
  }
);

const deleteTweet = asyncHandler(
  async (req: Request, res: Response): Promise<object> => {
    //TODO: delete tweet
    const id = Number(req.params?.id);
    if (!id) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User id not found");
    }
    const tweet = await Tweet.deleteTweet(id);
    if (!tweet || tweet.length === 0) {
      throw new ApiError(StatusCodes.NOT_MODIFIED, "Tweet not deleted");
    }
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(StatusCodes.OK, tweet, "Tweet deleted Successfully")
      );
  }
);

export { createTweet, getUserTweets, updateTweet, deleteTweet, getTweetById };

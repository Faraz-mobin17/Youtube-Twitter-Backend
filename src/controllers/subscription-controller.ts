import { Request, Response } from "express";
import { ApiError, ApiResponse } from "../utils/api-handler.js";
import { asyncHandler } from "../utils/async-handler.js";
import { UserService } from "../services/user-service.js";
import { UserRepository } from "../repositories/user-repository.js";
import { SubscriptionService } from "../services/subscription-service.js";
import { SubscriptionRepository } from "../repositories/subscription-repository.js";
import db from "../db/connection.db.js";
import { StatusCodes } from "http-status-codes";

const User = new UserService(new UserRepository(db));
const Subscription = new SubscriptionService(new SubscriptionRepository(db));

const toggleSubscription = asyncHandler(
  async (req: Request, res: Response): Promise<object> => {
    console.log("inside toggle subs controller");
    const { channelId } = req.params;
    const userId = req.user?.id;
    console.log(userId, channelId);
    const user = await User.getUser(userId);
    if (!user) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    // TODO: toggle subscription
    const isSubscribed = await Subscription.toggleSubscription(
      userId,
      channelId
    );
    if (isSubscribed) {
      return res
        .status(StatusCodes.OK)
        .json(
          new ApiResponse(
            StatusCodes.OK,
            { isSubscribed: true },
            "Subscribed successfully"
          )
        );
    }
    return res
      .status(StatusCodes.OK)
      .json(
        new ApiResponse(
          StatusCodes.OK,
          { isSubscribed: false },
          "Unsubscribed successfully"
        )
      );
  }
);

// controller to return subscriber list of a channel
// const getUserChannelSubscribers = asyncHandler(async (req, res) => {
//   const { channelId } = req.params;
// });

// // controller to return channel list to which user has subscribed
// const getSubscribedChannels = asyncHandler(async (req, res) => {
//   const { subscriberId } = req.params;
// });

// export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };

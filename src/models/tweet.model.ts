import mongoose, { Schema } from "mongoose";
import { Model } from "mongoose";
import { ITweet } from "../dto/modal.dto.js";
const tweetSchema: Schema<ITweet> = new Schema<ITweet>(
  {
    content: {
      type: String,
      required: [true, "content is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Tweet: Model<ITweet> = mongoose.model<ITweet>(
  "Tweet",
  tweetSchema
);

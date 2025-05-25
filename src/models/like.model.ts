import mongoose, { Schema } from "mongoose";
import { Model } from "mongoose";
import { ILike } from "../dto/modal.dto.js";
const likeSchema: Schema<ILike> = new Schema<ILike>(
  {
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    tweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Like: Model<ILike> = mongoose.model<ILike>("Like", likeSchema);

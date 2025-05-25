import mongoose, { Schema } from "mongoose";
import { Model } from "mongoose";
import { ISubscription } from "../dto/modal.dto.js";
const subscriptionSchema: Schema<ISubscription> = new Schema<ISubscription>(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //one who is subscribing
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, //one to whom subscriber subscribes
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription: Model<ISubscription> = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema
);

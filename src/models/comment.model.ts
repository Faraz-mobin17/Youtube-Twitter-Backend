import mongoose, { Model, Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { IComment } from "../dto/modal.dto.js";
const commentSchema: Schema<IComment> = new Schema<IComment>(
  {
    content: {
      type: String,
      required: [true, "content is required"],
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
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

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment: Model<IComment> = mongoose.model<IComment>(
  "Comment",
  commentSchema
);

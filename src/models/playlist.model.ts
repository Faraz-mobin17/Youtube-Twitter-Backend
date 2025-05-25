import mongoose, { Schema } from "mongoose";
import { Model } from "mongoose";
import { IPlaylist } from "../dto/modal.dto.js";
const playlistSchema: Schema<IPlaylist> = new Schema<IPlaylist>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    videos: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Playlist: Model<IPlaylist> = mongoose.model<IPlaylist>(
  "Playlist",
  playlistSchema
);

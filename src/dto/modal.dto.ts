import { Document, Types } from "mongoose";
export interface IUser extends Document {
  username: string;
  fullName: string;
  email: string;
  avatar: {
    public_id: string;
    url: string; // cloudinary url
  };
  coverImage?: {
    public_id: string;
    url: string; // cloudinary url
  };
  watchHistory: string[]; // Array of video IDs
  password: string;
  role?: "user" | "admin";
  refreshToken?: string;
  comparePassword(password: string): Promise<boolean>;
  generateAuthToken(): string;
  generateRefreshToken(): string;
}

export interface IComment extends Document {
  content: string;
  video: string | Types.ObjectId; // Video ID
  owner: string | Types.ObjectId; // User ID
}

export interface ILike extends Document {
  comment?: string | Types.ObjectId; // Comment ID
  video?: string | Types.ObjectId; // Video ID
  tweet?: string | Types.ObjectId; // Tweet ID
  likedBy: string | Types.ObjectId; // User ID
}

export interface ITweet extends Document {
  content: string;
  owner: string | Types.ObjectId; // User ID
  likes: string[]; // Array of User IDs who liked the tweet
  comments: string[]; // Array of Comment IDs
}

export interface IPlaylist extends Document {
  name: string;
  description?: string;
  videos: string[]; // Array of Video IDs
  owner: string | Types.ObjectId; // User ID
}

export interface ISubscription extends Document {
  subscriber: string | Types.ObjectId; // User ID of the subscriber
  channel: string | Types.ObjectId; // User ID of the channel being subscribed to
}

export interface IVideo extends Document {
  videoFile: { url?: string; public_id: string }; // Video file details
  title: string;
  description?: string;
  url: string; // URL of the video
  thumbnail: {
    public_id: string;
    url: string; // Cloudinary URL
  };
  owner: string | Types.ObjectId; // User ID of the video owner
  duration: number; // Duration in seconds
  views: number; // Number of views
  isPublished: boolean; // Whether the video is published or
}

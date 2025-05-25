import { Model, Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../dto/modal.dto.js";
import { env } from "../config/env.js";
const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "fullname is required"],
      trim: true,
      index: true,
    },
    avatar: {
      type: {
        public_id: String,
        url: String, //cloudinary url
      },
      required: true,
    },
    coverImage: {
      type: {
        public_id: String,
        url: String, //cloudinary url
      },
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  return next();
});

userSchema.methods = {
  comparePassword: async function (
    plainTextPassword: string
  ): Promise<void | boolean> {
    if (!plainTextPassword) {
      return await bcrypt.compare(plainTextPassword, this.password);
    }
  },
  generateAccessToken: function (): string {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      },
      env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: env.ACCESS_TOKEN_EXPIRES_IN,
      }
    );
  },
  generateRefreshToken: function (): string {
    return jwt.sign(
      {
        _id: this._id,
      },
      env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: env.REFRESH_TOKEN_EXPIRES_IN,
      }
    );
  },
};

export const User: Model<IUser> = model<IUser>("User", userSchema);

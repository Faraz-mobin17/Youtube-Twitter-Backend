import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { ApiResponse, ApiError } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { UserService } from "../services/user.service.js";
import { UserRepository } from "../repositories/user.repository.js";
import db from "../db/connection.db.js";
import { uploadOnCloudinary } from "../middlewares/index.js";

const User = new UserService(new UserRepository(db));

const getAllUsers = asyncHandler(async (_, res) => {
  const user = await User.getAllUsers();
  if (!user || user.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, user));
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const user = await User.getUser(userId);
  console.log("user controller getUser fn", user);
  if (user.length === 0) {
    throw new ApiError(400, "user not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, user));
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.user?.id;

  const result = await User.updateUser(req.body, id);

  if (!result || result.length === 0) {
    throw new ApiError(HttpStatusCodes.CONFLICT, "User not updated");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, "User updated"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const user = await User.deleteUser(userId);
  if (!user) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "User not delete");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, "User deleted successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const response = await User.loginUser(req.body.email, req.body.password);

  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  return res
    .status(HttpStatusCodes.OK)
    .cookie("token", response.token, options)
    .json(new ApiResponse(HttpStatusCodes.OK, response));
});
const logoutUser = asyncHandler(async (_, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(HttpStatusCodes.OK)
    .clearCookie("token", options)
    .json({ msg: "User logged out" });
});

const registerUser = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  console.log("inside user controller", avatarLocalPath, coverImageLocalPath);
  const avatar = await uploadOnCloudinary.uploadOnCloudinary(avatarLocalPath);
  const coverImage = coverImageLocalPath
    ? await uploadOnCloudinary.uploadOnCloudinary(coverImageLocalPath)
    : null;

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const response = await User.registerUser({
    ...req.body,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  if (!response) {
    throw new ApiError(400, "User not registered");
  }

  return res
    .status(HttpStatusCodes.CREATED)
    .json(
      new ApiResponse(
        HttpStatusCodes.CREATED,
        response,
        "User registered successfully"
      )
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const id = req.user?.id;

  console.log(oldPassword, newPassword);

  if (!(oldPassword && newPassword)) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "Password doesn't exists");
  }

  console.log("user id inside user controller", id);

  const user = await User.changeCurrentPassword(id, oldPassword, newPassword);

  if (!user || user.length === 0) {
    throw new ApiError(
      HttpStatusCodes.NOT_MODIFIED,
      "user password not updated"
    );
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(
        HttpStatusCodes.OK,
        user,
        "User Password Updated Successfully"
      )
    );
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) {
    throw new ApiError(400, "username is missing");
  }

  const channel = await User.getUserChannelProfile(username);

  if (!channel?.length) {
    throw new ApiError(404, "channel does not exists");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User channel fetched successfully")
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const username = req.user?.username;

  if (!username) {
    throw new ApiError(400, "user id is missing");
  }

  const history = await User.getWatchHistory(username);

  if (!history?.length) {
    throw new ApiError(404, "watch history not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, history, "Watch history fetched successfully"));
});

const updateAvatar = asyncHandler(async (req, res) => {
  // update avatar of the user
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  const avatar = await uploadOnCloudinary.uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(500, "Failed to upload avatar");
  }
  // update avatar of the user
  const id = req.user?.id;
  const updateAvatar = await User.updateAvatar(id, avatar.url);
  if (!updateAvatar) {
    throw new ApiError(500, "Failed to update avatar");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updateAvatar, "Avatar updated successfully"));
});

const updateCoverImage = asyncHandler(async (req, res) => {
  // update coverimage of the user
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }
  const coverImage =
    await uploadOnCloudinary.uploadOnCloudinary(coverImageLocalPath);
  if (!coverImage.url) {
    throw new ApiError(500, "Failed to upload cover image");
  }
  const updateCoverImage = await User.updateCoverImage(id, coverImage.url);
  if (!updateCoverImage) {
    throw new ApiError(500, "Failed to update cover image");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, updateCoverImage, "Cover image updated successfully")
    );
});

export {
  getAllUsers,
  getUser,
  changeCurrentPassword,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
  getUserChannelProfile,
  getWatchHistory,
  updateAvatar,
  updateCoverImage,
};

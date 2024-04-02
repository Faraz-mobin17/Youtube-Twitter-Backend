import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { ApiResponse, ApiError } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import User from "../models/User.model.js";
import AuthService from "../helper/auth.helper.js";

const getAllUsers = asyncHandler(async (_, res) => {
  const user = await User.findAll("users");
  if (!user) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, user));
});

const getUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id) || 1;
  const user = await User.findById("users", userId);
  if (!user) {
    throw new ApiError(400, "user not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, user));
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const id = Number(req.params.id) || 1; // Correct parsing of id
    // Update user record
    const result = await User.update("users", req.body, { id });

    // Check if user was updated successfully
    if (!result) {
      throw new ApiError(HttpStatusCodes.CONFLICT, "User not updated");
    }

    // Return success response
    return res
      .status(HttpStatusCodes.OK)
      .json(new ApiResponse(HttpStatusCodes.OK, "User updated"));
  } catch (error) {
    // Handle errors
    console.error("Error updating user:", error.message);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        new ApiResponse(
          HttpStatusCodes.INTERNAL_SERVER_ERROR,
          "Failed to update user"
        )
      );
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);
  const user = await User.remove("users", { id: userId });
  if (!user) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "User not delete");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, "User deleted successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!(oldPassword && newPassword)) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(
        new ApiError(HttpStatusCodes.BAD_REQUEST, "all fields are required")
      );
  }
  const userId = req.user?.id;

  const user = await User.findById("users", { id: userId });
  if (!user) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "User doesnt exists");
  }

  const isPasswordCorrect = AuthService.isPasswordCorrect(
    oldPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "Password doesnt mathc");
  }

  let hashPassword = AuthService.getHashPassword(newPassword);
  user.password = hashPassword;

  const updateUser = await User.update(
    "users",
    { password: user.password },
    { id: userId }
  );

  if (!updateUser) {
    throw new ApiError(400, "User not updated");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(HttpStatusCodes.OK, {}, "password changed Successfully")
    );
});

const updateAvatar = asyncHandler(async (req, res) => {
  // update avatar of the user
});

const updateCoverImage = asyncHandler(async (req, res) => {
  // update coverimage of the user
});

export { getAllUsers, getUser, changeCurrentPassword, updateUser, deleteUser };

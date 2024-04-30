import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { ApiResponse, ApiError } from "../utils/ApiHandler.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import AuthService from "../middlewares/authService.middleware.js";
import { UserService } from "../services/user.service.js";
import { UserRepository } from "../repositories/user.repository.js";
import db from "../db/connection.db.js"; // Import your Database class instance

// Modify the instantiation of UserService to use the Database instanc
const User = new UserService(new UserRepository(db));

const getAllUsers = asyncHandler(async (_, res) => {
  const user = await User.getAllUsers();
  if (!user) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, user));
});

const getUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id) || 1;
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
  const id = Number(req.params.id) || 1;

  const result = await User.updateUser(req.body, id);

  if (!result) {
    throw new ApiError(HttpStatusCodes.CONFLICT, "User not updated");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, "User updated"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);
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
  console.log("Inside user controller login user:", response);
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
  console.log(
    "Inside registerUser controller",
    req.body.username,
    req.body.email
  );
  const response = await User.registerUser(req.body);
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
  // not updated
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

export {
  getAllUsers,
  getUser,
  changeCurrentPassword,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
};

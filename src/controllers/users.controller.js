import db from "../db/connection.db.js";
import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { ApiResponse, ApiError } from "../utils/ApiHandler.utils.js";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import User from "../helper/query.helper.js";
import AuthService from "../helper/auth.helper.js";

class UserController {
  static getAllUsers = asyncHandler(async (_, res) => {
    const user = await User.findAll("users");
    if (!user) {
      throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found");
    }
    return res
      .status(HttpStatusCodes.OK)
      .json(new ApiResponse(HttpStatusCodes.OK, user));
  });

  static getUser = asyncHandler(async (req, res) => {
    const userId = Number(req.params.id) || 1;
    const user = await User.findById("users", userId);
    if (!user) {
      throw new ApiError(400, "user not found");
    }
    return res
      .status(HttpStatusCodes.OK)
      .json(new ApiResponse(HttpStatusCodes.OK, user));
  });

  static registerUser = asyncHandler(async (req, res) => {
    const {
      username,
      email,
      firstname,
      lastname,
      avatar,
      coverImage,
      password,
    } = req.body;

    if (
      [username, email, password, firstname].some(
        (field) => field.trim() === ""
      )
    ) {
      throw new ApiError(
        HttpStatusCodes.BAD_REQUEST,
        "All fields are required"
      );
    }

    const existsUser = await User.findOne("users", { username, email });

    if (existsUser) {
      throw new ApiError(
        HttpStatusCodes.BAD_REQUEST,
        "User with email or username already exists"
      );
    }

    let hashPassword = await AuthService.getHashPassword(password);

    const user = User.create("users", {
      username,
      email,
      firstname,
      lastname,
      avatar,
      coverImage,
      password: hashPassword,
    });
    if (!user) {
      throw new ApiError(HttpStatusCodes.CONFLICT, "User not created");
    }
    return res
      .status(HttpStatusCodes.OK)
      .json(
        new ApiResponse(
          HttpStatusCodes.OK,
          user,
          "User registered successfully"
        )
      );
  });

  static loginUser = asyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    if (!(email && password && username)) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json(
          new ApiError(HttpStatusCodes.UNAUTHORIZED, "All fields are required")
        );
    }
    const user = await User.findOne("users", { username, email });
    if (!user) {
      throw new ApiError(404, "User does not exists");
    }
    const passwordMatch = await AuthService.isPasswordCorrect(
      password,
      user.password
    );
    if (!passwordMatch) {
      throw new ApiError(401, "Password Incorrect");
    }
    const token = await AuthService.generateToken(user);
    // console.log("token: ", token);
    user.token = token;
    user.password = undefined; // dont want to send password to the user
    // send token in user cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };
    return res
      .status(HttpStatusCodes.OK)
      .cookie("token", token, options)
      .json(new ApiResponse(HttpStatusCodes.OK, user));
  });

  static logoutUser = asyncHandler(async (req, res) => {
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(HttpStatusCodes.OK)
      .clearCookie("token", options)
      .json({ user: req.user.firstname, msg: "User logged out" });
  });

  static updateUser = asyncHandler(async (req, res) => {
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

  static deleteUser = asyncHandler(async (req, res) => {
    const userId = Number(req.params.id);
    const user = await User.remove("users", { id: userId });
    if (!user) {
      throw new ApiError(HttpStatusCodes.BAD_REQUEST, "User not delete");
    }
    return res
      .status(HttpStatusCodes.OK)
      .json(new ApiResponse(HttpStatusCodes.OK, "User deleted successfully"));
  });

  static changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json(
          new ApiError(HttpStatusCodes.BAD_REQUEST, "all fields are required")
        );
    }
    const userId = req.user?.id;
    const query = `SELECT password FROM USERS WHERE id = ?`;
    const value = [userId];
    const [user] = await db.execute(query, value);
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user[0].password
    );
    if (!isPasswordCorrect) {
      throw new ApiError(HttpStatusCodes.BAD_REQUEST, "Password doesnt match");
    }
    let hashPassword = await bcrypt.hash(newPassword, 10);
    hashPassword = hashPassword.toString();
    user[0].password = hashPassword;

    // Update the password in the database
    const updateQuery = `UPDATE USERS SET password = ? WHERE id = ?`;
    const updateValues = [hashPassword, userId];
    await db.execute(updateQuery, updateValues);

    return res
      .status(HttpStatusCodes.OK)
      .json(
        new ApiResponse(HttpStatusCodes.OK, {}, "password changed Successfully")
      );
  });

  static updateAvatar = asyncHandler(async (req, res) => {
    // update avatar of the user
  });

  static updateCoverImage = asyncHandler(async (req, res) => {
    // update coverimage of the user
  });
}

export { UserController };

import db from "../db/connection.db.js";
import { HttpStatusCodes } from "../utils/CONSTANTS.js";
import { ApiResponse, ApiError } from "../utils/ApiHandler.js";
import { userExists } from "../utils/QueryHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";

import { SECRET_KEY, EXPIRES_IN } from "../index.js";

const generateToken = async (user) => {
  // console.log("generate Token method", user);
  try {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    return await jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
  } catch (error) {
    console.log("Error at generateToken method", error.message);
    throw error;
  }
};

const getAllUsers = asyncHandler(async (_, res) => {
  const query = "SELECT * FROM Users";
  const [rows] = await db.query(query);

  if (rows.length === 0) {
    return new ApiError(HttpStatusCodes.BAD_REQUEST, "users doesn't exist");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, rows));
});

const getUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id) || 1;
  const query = `SELECT username FROM USERS WHERE id= ?`;
  const value = [userId];
  const [user] = await db.query(query, value);
  if (user.length === 0) {
    throw new ApiError(400, "user not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, user));
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, firstname, lastname, avatar, coverImage, password } =
    req.body;

  // Check if any required field is empty
  if (
    [username, email, password, firstname].some((field) => field.trim() === "")
  ) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "All fields are required");
  }
  // hash the password
  let hashPassword = await bcrypt.hash(password, 10);
  hashPassword = hashPassword.toString();
  // Check if user already exists

  if (!(await userExists(username, email))) {
    throw new ApiError(HttpStatusCodes.CONFLICT, "User already exists");
  }

  // Insert new user if user does not exist
  const insertQuery = `INSERT INTO USERS(username, email, firstname, lastname, avatar, coverImage, password) VALUES(?, ?, ?, ?, ?, ?, ?)`;
  const insertValues = [
    username,
    email,
    firstname,
    lastname,
    avatar,
    coverImage,
    hashPassword,
  ];
  const [result] = await db.query(insertQuery, insertValues);

  return res
    .status(HttpStatusCodes.OK)
    .json(
      new ApiResponse(
        HttpStatusCodes.OK,
        result,
        "User registered successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!(email && password && username)) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json(
        new ApiError(HttpStatusCodes.UNAUTHORIZED, "All fields are required")
      );
  }
  const query = `SELECT * FROM USERS WHERE email = ? OR username = ?`;
  const values = [email, username];
  const [userExists] = await db.query(query, values);
  // console.log(userExists);
  // user doesn't exists
  if (!userExists) {
    throw new ApiError(404, "User does not exists");
  }
  const user = userExists[0];
  // console.log(" User: ", user); // object
  // verify password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(401, "Password Incorrect");
  }
  const token = await generateToken(user);
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

const logoutUser = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(HttpStatusCodes.OK)
    .clearCookie("token", options)
    .json({ user: req.user.firstname, msg: "User logged out" });
});

const updateUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params?.id) || 1;
  const { columnToUpdate, value } = req.body;

  const query = `UPDATE USERS SET ?? = ? WHERE id = ?`;
  const values = [columnToUpdate, value, userId];
  const [result] = await db.query(query, values);

  if (result.affectedRows === 0) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(new ApiError(HttpStatusCodes.BAD_REQUEST, "User not updated"));
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, "User updated"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);

  const query = "DELETE FROM USERS WHERE id = ?";
  const value = [userId];
  const [result] = await db.query(query, value);
  if (result.affectedRows === 0) {
    throw new ApiError(500, "user doesn't exists");
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
  const query = `SELECT password FROM USERS WHERE id = ?`;
  const value = [userId];
  const [user] = await db.query(query, value);
  const isPasswordCorrect = await bcrypt.compare(oldPassword, user[0].password);
  if (!isPasswordCorrect) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "Password doesnt match");
  }
  let hashPassword = await bcrypt.hash(newPassword, 10);
  hashPassword = hashPassword.toString();
  user[0].password = hashPassword;

  // Update the password in the database
  const updateQuery = `UPDATE USERS SET password = ? WHERE id = ?`;
  const updateValues = [hashPassword, userId];
  await db.query(updateQuery, updateValues);

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
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
};

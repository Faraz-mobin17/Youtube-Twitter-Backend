const db = require("../db/connection.db.js");
const HttpStatusCodes = require("../utils/constans.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY, EXPIRES_IN } = require("../index.js");

async function generateToken(user) {
  try {
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };
    const expiresIn = {
      expiresIn: EXPIRES_IN,
    };
    return await jwt.sign(payload, SECRET_KEY, expiresIn);
  } catch (error) {
    console.log("Error at generateToken method", error.message);
    throw error;
  }
}
async function getAllUsers(_, res) {
  try {
    const query = "SELECT firstname, lastname, username, email FROM users";
    const [rows] = await db.query(query);
    return res.status(HttpStatusCodes.OK).json({ rows });
  } catch (error) {
    console.error("Error while fetching Data: " + error.message);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: HttpStatusCodes.INTERNAL_SERVER_ERROR });
  }
}

async function getUser(req, res) {
  try {
    const userId = Number(req.params.id) || 1;
    const query = `SELECT username FROM USERS WHERE id= ?`;
    const value = [userId];
    const [user] = await db.query(query, value);
    if (!user) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    return res.status(HttpStatusCodes.OK).json({ user });
  } catch (error) {
    console.error("Error while fetching User: ", error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "An error occurred while fetching the user." });
  }
}

async function registerUser(req, res) {
  try {
    const {
      username,
      email,
      firstname,
      lastname,
      avatar,
      coverImage,
      password,
    } = req.body;

    // Check if any required field is empty
    if (
      [username, email, password, firstname].some(
        (field) => field.trim() === ""
      )
    ) {
      throw new Error("All fields are required");
    }
    // hash the password
    let hashPassword = await bcrypt.hash(password, 10);
    hashPassword = hashPassword.toString();
    // Check if user already exists
    const userExistsQuery = `SELECT * FROM USERS WHERE username = ? OR email = ?`;
    const userExistsValues = [username, email];
    const [existingUsers] = await db.query(userExistsQuery, userExistsValues);

    if (existingUsers.length > 0) {
      return res
        .status(HttpStatusCodes.CONFLICT)
        .json({ message: "User already exists" });
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

    return res.status(HttpStatusCodes.OK).json({ success: true, result });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ success: false, msg: "all fields are required" });
    }
    // check if the user exists
    const userExistsQuery = `SELECT * FROM USERS WHERE email = ?`;
    const userExistsValues = [email];
    const [existingUsers] = await db.query(userExistsQuery, userExistsValues);
    // user doesn't exists
    if (existingUsers.length === 0) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "User doesnt exists" });
    }
    const user = existingUsers[0];
    console.log(typeof user); // object
    // verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: "Invalid credentials" });
    }
    const token = await generateToken(user);
    console.log("token: ", token);
    user.token = token;
    user.password = undefined; // dont want to send password to the user
    // send token in user cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };
    return res.status(HttpStatusCodes.OK).cookie("token", token, options).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error has occurred: ", error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error });
  }
}
async function logoutUser(req, res) {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(HttpStatusCodes.OK)
    .clearCookie("token", options)
    .json({ user: req.user.firstname, msg: "User logged out" });
}
async function updateUser(req, res) {
  const userId = Number(req.params.id) || 1;
  const { columnToUpdate, value } = req.body;
  try {
    const query = `UPDATE USERS SET ?? = ? WHERE id = ?`;
    const values = [columnToUpdate, value, userId];
    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ success: false, msg: "User not found or not updated" });
    }

    return res
      .status(HttpStatusCodes.OK)
      .json({ success: true, msg: "User updated" });
  } catch (error) {
    logger.error("Error while updating user:", error.message);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "An error occurred" });
  }
}

async function deleteUser(req, res) {
  const userId = Number(req.params.id);
  try {
    const query = "DELETE FROM USERS WHERE id = ?";
    const value = [userId];
    const [result] = await db.query(query, value);
    if (result.affectedRows === 0) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ success: false, msg: "User not found or not updated" });
    }

    return res
      .status(HttpStatusCodes.OK)
      .json({ success: true, msg: "User Deleted Successfully" });
  } catch (error) {
    logger.error("Error while deleting user:", error.message);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, msg: "An error occurred" });
  }
}

async function changeCurrentPassword(req, res) {}

module.exports = {
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
};

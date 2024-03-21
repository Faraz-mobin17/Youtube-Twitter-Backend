const pool = require("../db/connection.db.js");
const HttpStatusCodes = require("../utils/constans.js");

async function getAllUsers(req, res) {
  try {
    const query = "SELECT firstname, lastname, username, email FROM users";
    const [rows] = await pool.query(query);
    return res.status(HttpStatusCodes.OK).json({ rows });
  } catch (error) {
    console.error("Error while fetching Data: " + error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: HttpStatusCodes.INTERNAL_SERVER_ERROR });
  }
}

async function getUser(req, res) {
  try {
    const userId = Number(req.params.id) || 1;
    const [user] = await pool.query(`SELECT username FROM USERS WHERE id= ?`, [
      userId,
    ]);
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

    // Check if user already exists
    const userExistsQuery = `SELECT * FROM USERS WHERE username = ? OR email = ?`;
    const userExistsValues = [username, email];
    const [existingUsers] = await pool.query(userExistsQuery, userExistsValues);

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
      password,
    ];
    const [result] = await pool.query(insertQuery, insertValues);

    return res.status(HttpStatusCodes.OK).json(result);
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
    const userExistsQuery = `SELECT email,password FROM USERS WHERE email = ?`;
    const userExistsValues = [email];
    const [existingUsers] = await pool.query(userExistsQuery, userExistsValues);
    // user doesn't exists
    if (existingUsers.length === 0) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "User doesnt exists" });
    }
    return res
      .status(HttpStatusCodes.OK)
      .json({ success: true, user: existingUsers });
  } catch (error) {
    console.log("Error has occurred: ", error);
    return res
      .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error });
  }
}

async function updateUser(req, res) {
  const userId = Number(req.params.id) || 1;
  const { columnToUpdate, value } = req.body;
  try {
    const query = `UPDATE USERS SET ?? = ? WHERE id = ?`;
    const values = [columnToUpdate, value, userId];
    const [result] = await pool.query(query, values);

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
    const [result] = await pool.query(query, value);
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

module.exports = {
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
};

import jwt from "jsonwebtoken";
import { HttpStatusCodes } from "../utils/CONSTANTS.js";
import { SECRET_KEY } from "../index.js";
import db from "../db/connection.db.js";

async function verifyJWT(req, res, next) {
  try {
    console.log("cookies from auth file: ", req.cookies);
    let token =
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    if (!token) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ success: false, msg: "Token not found" });
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);

    const query = `SELECT id, username, email, firstname, lastname FROM USERS WHERE id = ?`;
    const values = [decodedToken.id];

    const [result] = await db.query(query, values);

    const user = result[0];

    if (!user) {
      return res
        .status(HttpStatusCodes.NOT_FOUND)
        .json({ success: false, msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error message Invalid token access: ", error.message);
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ success: false, msg: "Invalid token" });
  }
}

export default verifyJWT;

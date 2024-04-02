import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiHandler.utils.js";
import AuthService from "../helper/auth.helper.js";

const verifyJWT = async (req, res, next) => {
  try {
    // console.log("User cookies from auth file: ", req.cookies);
    let token =
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    if (!token) {
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ success: false, msg: "Token not found" });
    }

    const decodedToken = await AuthService.verifyJwtToken(token);
    // console.log(decodedToken);
    // const query = `SELECT id, username, email, firstname, lastname FROM Users WHERE id = ?`;
    // const values = [decodedToken.id];

    // const [result] = await db.query(query, values);

    // const user = result[0];
    const user = await User.findById("users", { id: decodedToken.id });
    if (!user) {
      throw new ApiError(400, "User not found auth middleware");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error message Invalid token access: ", error.message);
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ success: false, msg: "Invalid token" });
  }
};

export { verifyJWT };

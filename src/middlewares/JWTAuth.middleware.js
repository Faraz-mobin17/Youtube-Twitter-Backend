import { HttpStatusCodes } from "../utils/httpStatusCodes.utils.js";
import { ApiError } from "../utils/ApiHandler.utils.js";
import AuthService from "./authService.middleware.js";
import { UserService } from "../services/user.service.js";
import { UserRepository } from "../repositories/user.repository.js";
import db from "../db/connection.db.js";
const userservice = new UserService(new UserRepository(db));
const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      (req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", ""));

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = await AuthService.verifyJwtToken(token);

    const user = await userservice.getUser(decodedToken.id);
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

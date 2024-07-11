import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../utils/api-handler.js";
import AuthService from "./authservice-middleware.js";
import { UserService } from "../services/user-service.js";

const userservice = new UserService();

const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | object> => {
  try {
    const token =
      req.cookies.token ||
      ((req.headers as any).authorization &&
        (req.headers as any).authorization.replace("Bearer ", ""));

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken: any = await AuthService.verifyJwtToken(token);

    const user = await userservice.getUser(decodedToken.id);
    if (!user) {
      throw new ApiError(400, "User not found auth middleware");
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.log("Error message Invalid token access: ", error.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, msg: "Invalid token" });
  }
};

export { verifyJWT };

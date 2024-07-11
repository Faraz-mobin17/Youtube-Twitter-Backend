import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../utils/api-handler.js";
import { StatusCodes } from "http-status-codes";

const verifyPremiumUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.is_premium) {
    return next();
  } else {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json(
        new ApiResponse(
          StatusCodes.FORBIDDEN,
          null,
          "Premium membership required"
        )
      );
  }
};

export { verifyPremiumUser };

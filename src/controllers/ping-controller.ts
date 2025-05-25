import { Request, Response } from "express";
import { ApiResponse } from "../utils/api-handler.js";
import { asyncHandler } from "../utils/async-handler.js";

const pingcheck = asyncHandler(
  async (_: Request, res: Response): Promise<object> => {
    //TODO: build a healthcheck response that simply returns the OK status as json with a message
    return res.status(200).json(new ApiResponse(200, "website is alive"));
  }
);

export { pingcheck };

import { logger } from "../app/logger.js";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/helper/ApiError.js";

export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  logger.error(`Route not found: ${req.method} ${req.originalUrl}`);
  return res.status(404).json(new ApiError(404, "Route not found"));
}

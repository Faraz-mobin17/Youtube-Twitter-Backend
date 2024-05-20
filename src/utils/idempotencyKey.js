import { ApiResponse } from "./ApiHandler.utils.js";

export const idempotencyStore = {};

export const checkIdempotencyKey = async (key) => {
  return idempotencyStore[key] || null;
};

export const storeIdempotencyKey = async (
  key,
  response,
  message = "User registered successfully"
) => {
  idempotencyStore[key] = new ApiResponse(
    response ? HttpStatusCodes.CREATED : HttpStatusCodes.CONFLICT,
    response,
    message
  );
};

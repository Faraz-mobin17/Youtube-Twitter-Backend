import dotenv from "dotenv";
import type { envType } from "../dto/env.dto.js";

export function loadEnv() {
  const result = dotenv.config();
  if (result.error) {
    throw result.error;
  }
  console.log("Environment variables loaded successfully.");
}

loadEnv();

export const env: envType = {
  PORT: Number(process.env.PORT) ?? 3000,
  MONGODB_URI: process.env.MONGODB_URI ?? "mongodb://localhost:27017",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
  LIMIT_DATA: process.env.LIMIT_DATA ?? 100,
  DB_NAME: process.env.DB_NAME ?? "mydatabase",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  SERVER_HOST: process.env.SERVER_HOST ?? "localhost",
  TEST_DB_NAME: process.env.TEST_DB_NAME ?? "test",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET ?? "code",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET ?? "code",
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN ?? "1h",
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN ?? "30d",
};

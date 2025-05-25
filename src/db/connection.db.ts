import mongoose from "mongoose";
import { env } from "../config/env.js";
import logger from "../utils/logger.js";
import type { IDatabaseConnection } from "../dto/database.dto.js";
let instance: DatabaseConnection | null = null;
// Singleton pattern to ensure only one instance of the database connection

/**
 * Singleton class to manage the MongoDB connection.
 * @class DatabaseConnection
 */

class DatabaseConnection implements IDatabaseConnection {
  constructor() {
    if (instance) {
      throw new Error("Database connection already exists");
    }
    instance = this;
  }
  getInstance() {
    if (!instance) {
      throw new Error("Database connection not initialized");
    }
    return instance;
  }
  async connect() {
    try {
      let connectionInstance: any;

      if (env.NODE_ENV === "development") {
        connectionInstance = await mongoose.connect(
          `${env.MONGODB_URI}/${env.TEST_DB_NAME}`
        );
      } else if (env.NODE_ENV === "production") {
        connectionInstance = await mongoose.connect(
          `${env.MONGODB_URI}/${env.DB_NAME}`
        );
      }

      logger.info(
        `MongoDB connected: ${connectionInstance.connection.host} ${process.env.MONGODB_URI}`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
      } else {
        logger.error("An unknown error occurred while connecting to MongoDB");
        process.exit(1);
      }
    } finally {
      logger.info("MongoDB connection attempt finished");
    }
  }
}

const connectDB = Object.freeze(new DatabaseConnection());
export { connectDB };

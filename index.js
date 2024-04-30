import dotenv from "dotenv";
dotenv.config();

export const HOST = process.env.MYSQL_HOST;
export const PASS = process.env.MYSQL_PASS;
export const USER = process.env.MYSQL_USER;
export const DATABASE = process.env.MYSQL_DATABASE;
export const SECRET_KEY = process.env.SECRET_KEY;
export const EXPIRES_IN = process.env.EXPIRES_IN;
export const ORIGIN = process.env.ORIGIN;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
export const MYSQL_PORT = process.env.MYSQL_PORT;

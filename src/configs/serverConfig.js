import dotenv from "dotenv";
dotenv.config();

export const serverConfig: {} = {
  HOST: process.env.MYSQL_HOST,
  PASS: process.env.MYSQL_PASS,
  USER: process.env.MYSQL_USER,
  DATABASE: process.env.MYSQL_DATABASE,
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,
  ORIGIN: process.env.ORIGIN,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  MYSQL_PORT: process.env.MYSQL_PORT,
};

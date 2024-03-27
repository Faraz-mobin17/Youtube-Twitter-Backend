import dotenv from "dotenv";
dotenv.config();

export const HOST = process.env.MYSQL_HOST;
export const PASS = process.env.MYSQL_PASS;
export const USER = process.env.MYSQL_USER;
export const DATABASE = process.env.MYSQL_DATABASE;
export const SECRET_KEY = process.env.SECRET_KEY;
export const EXPIRES_IN = process.env.EXPIRES_IN;

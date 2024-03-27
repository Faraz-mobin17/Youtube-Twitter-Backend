import dotenv from "dotenv";
dotenv.config();

const path = {
  HOST: process.env.MYSQL_HOST,
  PASS: process.env.MYSQL_PASS,
  USER: process.env.MYSQL_USER,
  DATABASE: process.env.MYSQL_DATABASE,
  SECRET_KEY: process.env.SECRET_KEY,
  EXPIRES_IN: process.env.EXPIRES_IN,
};

export default path;

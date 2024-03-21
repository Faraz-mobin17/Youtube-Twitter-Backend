require("dotenv").config();

const path = {
  HOST: process.env.MYSQL_HOST,
  PASS: process.env.MYSQL_PASS,
  USER: process.env.MYSQL_USER,
  DATABASE: process.env.MYSQL_DATABASE,
};

module.exports = path;

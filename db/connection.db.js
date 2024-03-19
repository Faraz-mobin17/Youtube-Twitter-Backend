const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.MYSQL_PASSWORD || "toor",
    database: process.env.MYSQL_DATABASE || "youtube",
  })
  .promise();

module.exports = pool;

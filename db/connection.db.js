const mysql = require("mysql2");
const { USER, DATABASE, HOST, PASSWORD } = require("../index");
const pool = mysql
  .createPool({
    host: HOST || "localhost",
    user: USER || "root",
    password: PASSWORD || "toor",
    database: DATABASE || "youtube",
  })
  .promise();

module.exports = pool;

import mysql from "mysql2";
import { USER, DATABASE, HOST, PASS } from "../index.js";
const pool = mysql
  .createPool({
    host: HOST || "localhost",
    user: USER || "root",
    password: PASS || "toor",
    database: DATABASE || "youtube",
  })
  .promise();

export default pool;

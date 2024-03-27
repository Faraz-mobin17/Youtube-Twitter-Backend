import mysql from "mysql2";
import { USER, DATABASE, HOST, PASSWORD } from "../index";
const pool = mysql
  .createPool({
    host: HOST || "localhost",
    user: USER || "root",
    password: PASSWORD || "toor",
    database: DATABASE || "youtube",
  })
  .promise();

export default pool;

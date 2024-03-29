import mysql from "mysql2/promise";
import { USER, DATABASE, HOST, PASS } from "../index.js";

// mysql://root:password@localhost:3306/test
const connectDB = async () => {
  try {
    const pool = await mysql.createPool({
      host: HOST,
      user: USER,
      password: PASS,
      database: DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    console.log("Connected to MySQL database");
    return pool;
  } catch (err) {
    console.log("mysql connection error", err);
    process.exit(1);
  }
};

const db = connectDB();
export default db;

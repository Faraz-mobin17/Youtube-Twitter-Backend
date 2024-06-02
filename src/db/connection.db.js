import mysql from "mysql2/promise";
import { USER, DATABASE, HOST, PASS, MYSQL_PORT } from "../../index.js";

class Database {
  constructor() {
    this.pool = null;
    // Call connect method when creating a new instance
    this.connect();
  }

  async connect() {
    try {
      const pool = mysql.createPool({
        host: HOST,
        user: USER,
        password: PASS,
        database: DATABASE,
        port: MYSQL_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      console.log("Connected to MySQL database");
      this.pool = pool; // Assign the pool to the instance property
    } catch (err) {
      console.log("mysql connection error", err);
      process.exit(1);
    }
  }

  async getConnection() {
    if (!this.pool) {
      await this.connect(); // Call connect method if pool is not initialized
    }
    return this.pool.getConnection();
  }

  async executeQuery(query, values) {
    try {
      const connection = await this.getConnection();
      const [rows] = await connection.execute(query, values);
      connection.release();
      return rows;
    } catch (error) {
      console.error("Error executing queries: ", error);
      throw error;
    }
  }
}

const db = new Database(); // Create a new instance of the Database class
export default db;

import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
// This code creates a connection pool to a MySQL database using environment variables for configuration.
// It uses the mysql2 library for promise-based database interactions.
// The connection pool allows multiple connections to be managed efficiently.
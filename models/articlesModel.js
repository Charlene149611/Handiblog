import pool from "../config/db.js";

export async function getAllArticles() {
  const [rows] = await pool.query("SELECT * FROM articles");
  return rows;
}
// This function retrieves all articles from the database.

import pool from "../config/db.js";

export async function getAllArticles() {
  const [rows] = await pool.query("SELECT * FROM articles");
  return rows;
}

export async function getArticleById(id) {
  const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
  return rows[0];
}

export async function createArticle(article) {
  const { title, content } = article;
  const [result] = await pool.query(
    "INSERT INTO articles (title, content) VALUES (?, ?)",
    [title, content]
  );
  return result.insertId;
}

export async function updateArticle(id, article) {
  const { title, content } = article;
  await pool.query(
    "UPDATE articles SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
}

export async function deleteArticle(id) {
  await pool.query("DELETE FROM articles WHERE id = ?", [id]);
}
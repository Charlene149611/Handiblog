import pool from "../config/db.js";

export async function getAllArticles() {
    const [rows] = await pool.query("SELECT * FROM articles");
    return rows;
}

export async function getArticleById(id) {
    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [
        id,
    ]);
    return rows[0];
}

export async function createArticle({
    title,
    content,
    category,
    user_id,
    image_url,
    created_at,
}) {
    const [result] = await pool.query(
        "INSERT INTO articles (title, content, category, user_id, image_url, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        [title, content, category, user_id, image_url, created_at]
    );
    return result.insertId;
}

export async function updateArticle({
    user_id,
    title,
    content,
    category,
    id,
    image_url,
    verified,
    created_at,
}) {
    const [result] = await pool.query(
        "UPDATE articles SET title=?, content=?, category=?, user_id=?, image_url=?, verified=?, created_at=? WHERE id = ?",
        [title, content, category, user_id, image_url, verified, created_at, id]
    );
    return result.changedRows; // lignes modifiées
}

export async function deleteArticle(id) {
    const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [
        id,
    ]);
    console.log(result.affectedRows);
    return result.affectedRows; // lignes supprimées
}

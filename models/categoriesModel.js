import pool from "../config/db.js";

// Create
export async function createCategory( titre ) {
    const [result] = await pool.query(
        "INSERT INTO categories (titre) VALUES (?)",
        [titre]
    );
    return result.insertId;
}

// Read
export async function getAllCategories() {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
}

export async function getCategoryById(id) {
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [
        id,
    ]);
    return rows[0];
}

// Update
export async function updateCategory({ id, titre }) {
    const [result] = await pool.query(
        "UPDATE categories SET titre=? WHERE id = ?",
        [titre, id]
    );
    return result.changedRows; // lignes modifiées
}

// Delete
export async function deleteCategory(id) {
    const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [
        id,
    ]);
    return result.affectedRows; // lignes supprimées
}
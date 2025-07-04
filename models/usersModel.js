import pool from "../config/db.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

export async function createUser(email, hashedPassword, role) {
  await pool.query(
    "INSERT INTO users (email, hashedpassword, role) VALUES (?, ?, ?)",
    [email, hashedPassword, role]
  );
}
// This function creates a new user in the database with the specified email, hashed password, and role.

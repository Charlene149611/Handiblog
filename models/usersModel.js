import pool from "../config/db.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
}

export async function createUser(
  username,
  email,
  hashedPassword,
  role = "lecteur"
) {
  await pool.query(
    "INSERT INTO users (username, email, hashedpassword, role) VALUES (?, ?, ?)",
    [username, email, hashedPassword, role]
  );
}
// This function creates a new user in the database with the specified email, hashed password, and role.

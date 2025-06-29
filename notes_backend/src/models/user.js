const bcrypt = require('bcryptjs');
const { getPool } = require('../db');

/**
 * PUBLIC_INTERFACE
 * Registers a new user with a unique email and hashed password.
 */
async function registerUser({ email, password }) {
  const pool = await getPool();
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user
  const [result] = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    [email, hashedPassword]
  );
  return { id: result.insertId, email };
}

/**
 * PUBLIC_INTERFACE
 * Finds and returns a user object by email.
 */
async function findUserByEmail(email) {
  const pool = await getPool();
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0] || null;
}

/**
 * PUBLIC_INTERFACE
 * Finds and returns a user object by ID.
 */
async function findUserById(id) {
  const pool = await getPool();
  const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
}

/**
 * PUBLIC_INTERFACE
 * Validates provided password against user's password hash.
 */
async function validatePassword(plainPassword, passwordHash) {
  return await bcrypt.compare(plainPassword, passwordHash);
}

module.exports = {
  registerUser,
  findUserByEmail,
  findUserById,
  validatePassword,
};

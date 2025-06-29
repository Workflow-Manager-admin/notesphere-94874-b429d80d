const { getPool } = require('../db');

/**
 * PUBLIC_INTERFACE
 * Create a new note for a user.
 */
async function createNote({ userId, title, content }) {
  const pool = await getPool();
  const [res] = await pool.query(
    'INSERT INTO notes (user_id, title, content, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [userId, title, content]
  );
  return { id: res.insertId, user_id: userId, title, content };
}

/**
 * PUBLIC_INTERFACE
 * Get a single note by ID for a specific user.
 */
async function getNoteById({ userId, noteId }) {
  const pool = await getPool();
  const [rows] = await pool.query(
    'SELECT * FROM notes WHERE id = ? AND user_id = ?',
    [noteId, userId]
  );
  return rows[0] || null;
}

/**
 * PUBLIC_INTERFACE
 * List/search notes for a user (optionally by search term).
 */
async function listNotes({ userId, search }) {
  const pool = await getPool();
  let sql = 'SELECT * FROM notes WHERE user_id = ?';
  let params = [userId];

  if (search) {
    sql += ' AND (title LIKE ? OR content LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  sql += ' ORDER BY updated_at DESC';

  const [rows] = await pool.query(sql, params);
  return rows;
}

/**
 * PUBLIC_INTERFACE
 * Update an existing note for a user.
 */
async function updateNote({ userId, noteId, title, content }) {
  const pool = await getPool();
  await pool.query(
    'UPDATE notes SET title = ?, content = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
    [title, content, noteId, userId]
  );
  return getNoteById({ userId, noteId });
}

/**
 * PUBLIC_INTERFACE
 * Delete a note by ID for a specific user.
 */
async function deleteNote({ userId, noteId }) {
  const pool = await getPool();
  await pool.query('DELETE FROM notes WHERE id = ? AND user_id = ?', [noteId, userId]);
}

module.exports = {
  createNote,
  getNoteById,
  listNotes,
  updateNote,
  deleteNote,
};

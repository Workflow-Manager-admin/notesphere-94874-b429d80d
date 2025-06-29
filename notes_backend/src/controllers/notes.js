const {
  createNote,
  getNoteById,
  listNotes,
  updateNote,
  deleteNote,
} = require('../models/note');

/**
 * PUBLIC_INTERFACE
 * Create note for auth user.
 */
async function create(req, res) {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const note = await createNote({ userId: req.user.id, title, content });
  res.status(201).json(note);
}

/**
 * PUBLIC_INTERFACE
 * Get note by ID for auth user.
 */
async function get(req, res) {
  const { noteId } = req.params;
  const note = await getNoteById({ userId: req.user.id, noteId });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
}

/**
 * PUBLIC_INTERFACE
 * List/search notes for auth user.
 */
async function list(req, res) {
  const { q } = req.query;
  const notes = await listNotes({ userId: req.user.id, search: q });
  res.json(notes);
}

/**
 * PUBLIC_INTERFACE
 * Update note by ID for auth user.
 */
async function update(req, res) {
  const { noteId } = req.params;
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const note = await getNoteById({ userId: req.user.id, noteId });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  const updated = await updateNote({ userId: req.user.id, noteId, title, content });
  res.json(updated);
}

/**
 * PUBLIC_INTERFACE
 * Delete note by ID for auth user.
 */
async function remove(req, res) {
  const { noteId } = req.params;
  const note = await getNoteById({ userId: req.user.id, noteId });
  if (!note) return res.status(404).json({ error: 'Note not found' });
  await deleteNote({ userId: req.user.id, noteId });
  res.status(204).send();
}

module.exports = { create, get, list, update, remove };

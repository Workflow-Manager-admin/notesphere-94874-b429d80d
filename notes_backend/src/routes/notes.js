const express = require('express');
const notesController = require('../controllers/notes');
const { authenticateJWT } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: List/Search notes for authenticated user
 *     tags: [Notes]
 *     parameters:
 *       - name: q
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Search query (title or content)
 *     responses:
 *       200:
 *         description: List of notes
 *   post:
 *     summary: Create note for authenticated user
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 */

router.get('/', authenticateJWT, notesController.list);
router.post('/', authenticateJWT, notesController.create);

/**
 * @swagger
 * /api/notes/{noteId}:
 *   get:
 *     summary: Get specific note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note id
 *     responses:
 *       200:
 *         description: Note found
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note id
 *     responses:
 *       200:
 *         description: Note updated
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note id
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */
router.get('/:noteId', authenticateJWT, notesController.get);
router.put('/:noteId', authenticateJWT, notesController.update);
router.delete('/:noteId', authenticateJWT, notesController.remove);

module.exports = router;

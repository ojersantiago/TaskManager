const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const authMiddleware = require('../middleware/authMiddleware');

// Todas las rutas de tareas requieren autenticación
router.use(authMiddleware);

// GET /api/tasks - Traer todas las tareas del usuario
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// GET /api/tasks/:id - Traer una tarea
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// POST /api/tasks - Crear una tarea
router.post('/', async (req, res) => {
  const { title, description, due_date } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description, due_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, title, description, due_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// PUT /api/tasks/:id - Editar una tarea
router.put('/:id', async (req, res) => {
  const { title, description, due_date, completed } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, due_date = $3, completed = $4 
       WHERE id = $5 AND user_id = $6 
       RETURNING *`,
      [title, description, due_date, completed, req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

// DELETE /api/tasks/:id - Eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [req.params.id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
});

module.exports = router;
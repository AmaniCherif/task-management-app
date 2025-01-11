const db = require('../config/database');

// Create a new task
exports.create = async (req, res) => {
  try {
    const { title, description, priority, due_date } = req.body;
    const [result] = await db.execute(
      'INSERT INTO tasks (title, description, priority, due_date, completed) VALUES (?, ?, ?, ?, ?)',
      [title, description, priority, due_date, false]
    );
    res.status(201).json({ id: result.insertId, message: 'Task created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all tasks
exports.findAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get task by id
exports.findOne = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task
exports.update = async (req, res) => {
  try {
    const { title, description, priority, due_date, completed } = req.body;
    await db.execute(
      'UPDATE tasks SET title = ?, description = ?, priority = ?, due_date = ?, completed = ? WHERE id = ?',
      [title, description, priority, due_date, completed, req.params.id]
    );
    res.json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
exports.delete = async (req, res) => {
  try {
    await db.execute('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle task completion
exports.toggleComplete = async (req, res) => {
  try {
    await db.execute(
      'UPDATE tasks SET completed = NOT completed WHERE id = ?',
      [req.params.id]
    );
    res.json({ message: 'Task completion status updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

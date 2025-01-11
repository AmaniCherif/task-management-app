const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// Create a new task
router.post('/', taskController.create);

// Get all tasks
router.get('/', taskController.findAll);

// Get task by id
router.get('/:id', taskController.findOne);

// Update task
router.put('/:id', taskController.update);

// Delete task
router.delete('/:id', taskController.delete);

// Toggle task completion
router.patch('/:id/toggle', taskController.toggleComplete);

module.exports = router;

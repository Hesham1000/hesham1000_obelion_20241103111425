const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
    defaultValue: 'Low',
  },
}, {
  tableName: 'Tasks',
  timestamps: false,
});

const TaskController = require('../controllers/TaskController');

// GET /tasks - Retrieve all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskController.getAllTasks();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// POST /tasks - Create a new task
router.post('/tasks', async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  try {
    const newTask = await TaskController.createTask({ title, description, dueDate, priority });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /tasks/:id - Update an existing task
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority } = req.body;

  try {
    const updatedTask = await TaskController.updateTask(id, { title, description, dueDate, priority });
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await TaskController.deleteTask(id);
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
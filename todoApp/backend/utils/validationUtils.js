const Sequelize = require('sequelize');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

const Task = sequelize.define('Task', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  priority: {
    type: Sequelize.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
    defaultValue: 'Low',
  },
}, {
  tableName: 'Tasks',
});

const validateTaskData = (taskData) => {
  const { title, description, dueDate, priority } = taskData;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    throw new Error('Invalid title');
  }

  if (!description || typeof description !== 'string' || description.trim() === '') {
    throw new Error('Invalid description');
  }

  if (!dueDate || isNaN(Date.parse(dueDate))) {
    throw new Error('Invalid due date');
  }

  const validPriorities = ['Low', 'Medium', 'High'];
  if (!validPriorities.includes(priority)) {
    throw new Error('Invalid priority level');
  }
};

module.exports = {
  sequelize,
  Task,
  validateTaskData,
};
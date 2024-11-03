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
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
    defaultValue: 'Low'
  }
}, {
  tableName: 'Tasks',
  timestamps: false
});

module.exports = { sequelize, Task };
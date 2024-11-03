const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

class Task extends Model {}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    allowNull: false,
    defaultValue: 'Low',
  },
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'Tasks',
  timestamps: false,
});

module.exports = Task;
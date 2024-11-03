const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/UserModel'); // Assuming UserModel is defined in the models directory
const Sequelize = require('sequelize');

const sequelize = new Sequelize('None', 'root', 'root', {
  host: 'db', // Updated from 'localhost' to 'db'
  dialect: 'mysql',
  port: 3306,
});

// Function to authenticate user by verifying JWT
const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, 'your_jwt_private_key'); // Use a secure key in production
    req.user = decoded;
    const user = await UserModel.findOne({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: 'User not found.' });
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Function to handle login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found.' });
    
    const validPassword = await user.validatePassword(password);
    if (!validPassword) return res.status(400).json({ error: 'Incorrect password.' });

    const token = jwt.sign({ id: user.id }, 'your_jwt_private_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Function to handle registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await UserModel.create({ username, email, password });
    const token = jwt.sign({ id: user.id }, 'your_jwt_private_key', { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {
  authenticateUser,
  loginUser,
  registerUser,
};
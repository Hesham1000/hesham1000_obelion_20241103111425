const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/userController');
const { User } = require('../models'); // Assuming a Sequelize model is used

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await registerUser(username, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

Ensure that the Sequelize model for `User` corresponds to the `users` table and includes the primary key `id`. Update the database connection configuration to use `db` instead of `localhost`.
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
// const authRoutes = require('./routes/authRoutes'); // Example for additional routes

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'agent',
  password: 'agentpass',
  database: 'Obelien AI'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use('/api', userRoutes);
app.use('/api', taskRoutes);
// app.use('/api', authRoutes); // Example for additional routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

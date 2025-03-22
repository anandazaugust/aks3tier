const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');



const app = express();
const port = 80;

const corsOptions = {
  origin: process.env.frontendurl  // Replace with your actual frontend URL

};

// Middleware for parsing JSON
app.use(express.json());
app.use(cors(corsOptions));

// MySQL Database connection pool
const pool = mysql.createPool({
  host: process.env.mysql_host,  // Change to your MySQL service name in AKS
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// API endpoint to get all users
app.get('/api/users', (req, res) => {
  pool.query('SELECT * FROM engineers', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

// API endpoint to add a user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  pool.query('INSERT INTO engineers (name, email) VALUES (?, ?)', [name, email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.status(201).json({ id: results.insertId, name, email });
  });
});

// API endpoint to update a user
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  pool.query('UPDATE engineers SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id, name, email });
  });
});

// API endpoint to delete a user
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  pool.query('DELETE FROM engineers WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  });
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 80;

// Middleware for parsing JSON
app.use(express.json());
app.use(cors());

// MySQL Database connection pool
const pool = mysql.createPool({
  host: 'mysql-service.db',  // Change to your MySQL service name in AKS
  user: 'mysqluser',
  password: 'mysqlpassword',
  database: 'ananddb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// API endpoint to get all users
app.get('/api/users', (req, res) => {
  pool.query('SELECT * FROM gold', (err, results) => {
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

  pool.query('INSERT INTO gold (name, email) VALUES (?, ?)', [name, email], (err, results) => {
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

  pool.query('UPDATE gold SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
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

  pool.query('DELETE FROM gold WHERE id = ?', [id], (err, results) => {
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

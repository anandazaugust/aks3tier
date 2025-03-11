const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');  // Import MySQL client

const app = express();
const port = 80;

// Enable CORS to allow cross-origin requests from your frontend
app.use(cors());

// Create a MySQL connection pool (use your actual database details here)
const poolindia = mysql.createPool({
  host: 'mysql-service',  // Service name of the MySQL pod (change if necessary)
  user: 'mysqluser',      // Database username
  password: 'mysqlpassword',  // Database password
  database: 'ananddb',     // Database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// API endpoint to get users from MySQL
app.get('/api/users', (req, res) => {
  // Query to get users from the database
  poolindia.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch users from database' });
    }
    res.json(results);  // Send the user data as JSON
  });
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

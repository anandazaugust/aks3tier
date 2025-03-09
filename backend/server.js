const express = require('express');
const cors = require('cors');

const app = express();
const port = 80;

// Enable CORS to allow cross-origin requests from your frontend
app.use(cors());

// Hardcoded user data (no database involved)
const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: 3, name: 'Sam Green', email: 'sam.green@example.com' },
];

// API endpoint to get users (serving the hardcoded data)
app.get('/api/users', (req, res) => {
  res.json(users);  // Send the hardcoded users as a JSON response
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

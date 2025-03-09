import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import Axios for making HTTP requests
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);  // Store users fetched from the backend
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://74.177.153.27:80/api/users');  // API call to backend
      setUsers(response.data);
      setLoading(false);  // Data fetched, set loading to false
    } catch (error) {
      setError('Failed to fetch data');  // Set error state if request fails
      setLoading(false);  // Stop loading even on error
    }
  };

  useEffect(() => {
    fetchUsers();  // Fetch users when the component mounts
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>This is my frontend app - Anand</h1>
      </header>

      {loading && <p>Loading...</p>}  {/* Show loading message */}
      {error && <p>{error}</p>}       {/* Show error message if any */}
      
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default App;

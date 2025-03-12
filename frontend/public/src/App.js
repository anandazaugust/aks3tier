import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://74.177.193.39/api/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Anand's Dashboard</h1>
        <p className="header-description">Check out the list of users below!</p>
      </header>

      <div className="user-list-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {users.length > 0 ? (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">
                <div className="user-info">
                  <p><strong>{user.name}</strong></p>
                  <p>{user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default App;

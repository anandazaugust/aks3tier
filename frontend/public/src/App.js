import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
const API_URL = process.env.REACT_APP_API_URL;

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updateUserId, setUpdateUserId] = useState(null); // For updating a user
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);  // Corrected string interpolation
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

  // Add a new user (POST request)
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, { name, email });  // Corrected string interpolation
      setUsers([...users, response.data]);  // Add the new user to the state
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Update an existing user (PUT request)
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/${updateUserId}`, { name: updateName, email: updateEmail });  // Corrected string interpolation
      const updatedUsers = users.map(user =>
        user.id === updateUserId ? { ...user, name: updateName, email: updateEmail } : user
      );
      setUsers(updatedUsers);
      setUpdateUserId(null);
      setUpdateName('');
      setUpdateEmail('');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Delete a user (DELETE request)
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);  // Corrected string interpolation
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Anand's Dashboard</h1>
        <p className="header-description">Check out the list of users below!</p>
      </header>

      {/* Form to Add a User */}
      <div className="add-user-form">
        <h2>Add a New User</h2>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Add User</button>
        </form>
      </div>

      {/* Form to Update a User */}
      {updateUserId && (
        <div className="update-user-form">
          <h2>Update User</h2>
          <form onSubmit={handleUpdateUser}>
            <input
              type="text"
              placeholder="Name"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              required
            />
            <button type="submit">Update User</button>
          </form>
        </div>
      )}

      {/* Display Users */}
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

                {/* Edit and Delete buttons */}
                <div className="user-actions">
                  <button onClick={() => { setUpdateUserId(user.id); setUpdateName(user.name); setUpdateEmail(user.email); }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
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

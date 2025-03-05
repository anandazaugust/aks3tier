import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://backend-service:3000/api/message')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
    <div>
      <h1>Frontend: {message}</h1>
    </div>
  );
}

export default App;

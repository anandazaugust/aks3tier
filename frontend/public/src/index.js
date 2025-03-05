import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';  // Correctly import App.js
// import reportWebVitals from './reportWebVitals'; // Removed
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals(); // Removed

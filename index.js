import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';  // CSS file for global styles
import App from './App';  // Main component of the application
import reportWebVitals from './reportWebVitals';  // Optional performance analytics

// Render the App component and attach it to the root DOM element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional function to measure performance in the app (if needed)
reportWebVitals();


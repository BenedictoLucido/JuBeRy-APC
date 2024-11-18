// src/App.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate('/dashboard');  // Navigate to the Products page
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the App</h1>
        <button onClick={goToProducts} className="navigate-button">
          Go to Products
        </button>
      </header>
    </div>
  );
}

export default App;

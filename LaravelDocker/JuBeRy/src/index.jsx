// src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import Routes and Route
import App from './App';
import Products from './pages/Products'; // Import Products component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />  {/* Home or Landing Page */}
        <Route path="/dashboard" element={<Products />} />  {/* Show Products */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

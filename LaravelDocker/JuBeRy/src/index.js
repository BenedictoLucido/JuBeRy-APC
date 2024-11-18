// index.js (Make sure the routes are defined correctly)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components
import App from './App';
import Products from './pages/Products'; // Import Products component

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  </Router>
);

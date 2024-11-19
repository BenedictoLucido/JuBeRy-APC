// src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Import Routes and Route
import App from './App';
import Dashboard from './Dashboard/Dashboard'; // Import the Dashboard component
import Products from './pages/Products'; // Import Products component (Make sure it's in the correct path)
import AvailableDevices from './pages/AvailableDevices'; // Available Devices
import UpdateAssetDevices from './pages/UpdateAssetDevices' // Update Asset Devices
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Define the routes and the components for each path */}
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/availableDevices" element={<AvailableDevices />} />
        <Route path="/updateAssetDevices" element={<UpdateAssetDevices />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

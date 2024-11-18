// server.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'inventory_db' // Replace with your database name
});

// Test DB connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Set up middleware for JSON parsing
app.use(express.json());

// Define a simple API endpoint to fetch products from the database
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

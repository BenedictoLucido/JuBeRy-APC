const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Import cors once

const app = express();
const port = 5000;

// Use CORS to allow cross-origin requests
app.use(cors());  // This will allow requests from any origin

// Allow requests from your frontend's URL (e.g., GitHub Pages URL or localhost)
// This line is sufficient if you want to specify a specific origin
// app.use(cors({
//   origin: 'https://fantastic-engine-7xggvpp7vxx2x9pr-3000.app.github.dev', // Replace with your frontend URL
// }));

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'laravel_products' // Replace with your actual database name
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

// Define a simple route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the Products API!');
});

// Define a simple API endpoint to fetch products from the database
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err); // Log the error
      res.status(500).json({ error: 'Database query error' });
      return;
    }
    console.log('Products fetched:', results); // Log the results for debugging
    res.json(results); // Send the products as JSON response
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

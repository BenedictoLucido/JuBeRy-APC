// src/pages/Products.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products when the component mounts
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        console.log('API Response:', response); // Log the response
        setProducts(response.data);  // Save the fetched products
        setLoading(false);            // Stop loading spinner
      })
      .catch((err) => {
        console.error('Error fetching products:', err); // Log error to the console
        setError('Error fetching products');
        setLoading(false);  // Stop loading spinner
      });
  }, []);

  // Render loading, error, or products
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.product_id}>
            <h3>{product.product_name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;

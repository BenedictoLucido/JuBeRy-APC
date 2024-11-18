// Products.jsx (Make sure it's properly fetching data)
import React, { useState, useEffect } from 'react';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.product_id}>{product.product_name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default Products;

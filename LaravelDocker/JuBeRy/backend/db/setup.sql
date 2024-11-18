-- setup.sql: Script to create database and tables
CREATE DATABASE IF NOT EXISTS inventory_db;

USE inventory_db;

CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT
);

-- Insert sample data
INSERT INTO products (product_name, quantity, price, description) VALUES
('Laptop', 10, 899.99, 'A high-performance laptop'),
('Smartphone', 50, 299.99, 'A feature-rich smartphone'),
('Headphones', 200, 49.99, 'Noise-cancelling headphones');

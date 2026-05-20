-- 03_basic_selects.sql

-- All customers
SELECT customer_id, full_name, email, city, created_at
FROM customers;

-- Filter by city
SELECT customer_id, full_name, city
FROM customers
WHERE city = 'New York';

-- Sort products by price descending
SELECT product_id, product_name, price
FROM products
ORDER BY price DESC;

-- Pagination-style example
SELECT product_id, product_name, category, price
FROM products
ORDER BY product_id
LIMIT 3;

-- Search pattern
SELECT product_id, product_name
FROM products
WHERE product_name LIKE '%Desk%';

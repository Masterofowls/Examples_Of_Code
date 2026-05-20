-- 06_subqueries_cte.sql

-- Subquery: products priced above overall average
SELECT product_id, product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products)
ORDER BY price DESC;

-- Correlated subquery: each customer's latest order
SELECT
  o.order_id,
  o.customer_id,
  o.order_date,
  o.total_amount
FROM orders o
WHERE o.order_date = (
  SELECT MAX(o2.order_date)
  FROM orders o2
  WHERE o2.customer_id = o.customer_id
)
ORDER BY o.customer_id;

-- CTE: customer order totals
WITH customer_totals AS (
  SELECT
    c.customer_id,
    c.full_name,
    COUNT(o.order_id) AS order_count,
    COALESCE(SUM(o.total_amount), 0) AS total_spent
  FROM customers c
  LEFT JOIN orders o ON c.customer_id = o.customer_id
  GROUP BY c.customer_id, c.full_name
)
SELECT *
FROM customer_totals
ORDER BY total_spent DESC;

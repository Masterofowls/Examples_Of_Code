-- 04_joins.sql

-- INNER JOIN: orders with customer names
SELECT
  o.order_id,
  o.order_date,
  o.status,
  o.total_amount,
  c.full_name AS customer_name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
ORDER BY o.order_id;

-- JOIN across 3 tables: order lines with product details
SELECT
  o.order_id,
  c.full_name,
  p.product_name,
  oi.quantity,
  oi.unit_price,
  (oi.quantity * oi.unit_price) AS line_total
FROM order_items oi
INNER JOIN orders o ON oi.order_id = o.order_id
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_id, oi.order_item_id;

-- LEFT JOIN: include customers even if they have no orders
SELECT
  c.customer_id,
  c.full_name,
  o.order_id,
  o.status
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
ORDER BY c.customer_id, o.order_id;

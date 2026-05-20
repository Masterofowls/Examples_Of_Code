-- 05_aggregates_group_by.sql

-- Basic aggregates
SELECT
  COUNT(*) AS total_orders,
  SUM(total_amount) AS revenue_total,
  AVG(total_amount) AS avg_order_value,
  MIN(total_amount) AS smallest_order,
  MAX(total_amount) AS largest_order
FROM orders;

-- Revenue by order status
SELECT
  status,
  COUNT(*) AS order_count,
  SUM(total_amount) AS status_revenue
FROM orders
GROUP BY status
ORDER BY status_revenue DESC;

-- Customer spend with HAVING
SELECT
  c.customer_id,
  c.full_name,
  SUM(o.total_amount) AS lifetime_value
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.full_name
HAVING SUM(o.total_amount) >= 100
ORDER BY lifetime_value DESC;

-- Product sales quantity
SELECT
  p.product_id,
  p.product_name,
  SUM(oi.quantity) AS units_sold
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY units_sold DESC;

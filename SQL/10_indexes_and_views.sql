-- 10_indexes_and_views.sql

-- Indexes for common filters and joins
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_order_date ON orders(order_date);
CREATE INDEX idx_products_category ON products(category);

-- View: order summary by customer
CREATE VIEW customer_order_summary AS
SELECT
  c.customer_id,
  c.full_name,
  COUNT(o.order_id) AS total_orders,
  COALESCE(SUM(o.total_amount), 0) AS total_spent,
  MAX(o.order_date) AS latest_order_date
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.full_name;

-- Query the view
SELECT *
FROM customer_order_summary
ORDER BY total_spent DESC;

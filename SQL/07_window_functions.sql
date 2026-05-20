-- 07_window_functions.sql

-- Rank orders by amount within each status
SELECT
  order_id,
  status,
  total_amount,
  RANK() OVER (PARTITION BY status ORDER BY total_amount DESC) AS amount_rank
FROM orders
ORDER BY status, amount_rank;

-- Running revenue by date
SELECT
  order_id,
  order_date,
  total_amount,
  SUM(total_amount) OVER (
    ORDER BY order_date, order_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_revenue
FROM orders
ORDER BY order_date, order_id;

-- Compare each order to previous order for the same customer
SELECT
  order_id,
  customer_id,
  order_date,
  total_amount,
  LAG(total_amount) OVER (
    PARTITION BY customer_id
    ORDER BY order_date, order_id
  ) AS previous_order_amount
FROM orders
ORDER BY customer_id, order_date, order_id;

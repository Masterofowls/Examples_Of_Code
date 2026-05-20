-- 02_seed_data.sql

INSERT INTO customers (customer_id, full_name, email, city, created_at) VALUES
  (1, 'Alice Johnson', 'alice@example.com', 'New York', '2026-01-10 09:00:00'),
  (2, 'Bob Smith', 'bob@example.com', 'Los Angeles', '2026-01-12 10:30:00'),
  (3, 'Charlie Lee', 'charlie@example.com', 'Chicago', '2026-01-20 14:00:00'),
  (4, 'Diana King', 'diana@example.com', 'Seattle', '2026-02-01 11:15:00');

INSERT INTO products (product_id, product_name, category, price, stock_quantity) VALUES
  (101, 'Laptop Pro 14', 'Electronics', 1499.99, 25),
  (102, 'Wireless Mouse', 'Electronics', 39.99, 140),
  (103, 'Mechanical Keyboard', 'Electronics', 89.50, 80),
  (104, 'Water Bottle', 'Home', 19.90, 200),
  (105, 'Desk Lamp', 'Home', 49.00, 60),
  (106, 'Notebook Set', 'Office', 12.75, 300);

INSERT INTO orders (order_id, customer_id, order_date, status, total_amount) VALUES
  (1001, 1, '2026-03-01', 'shipped', 1579.48),
  (1002, 2, '2026-03-02', 'processing', 102.25),
  (1003, 1, '2026-03-05', 'pending', 49.00),
  (1004, 3, '2026-03-07', 'shipped', 39.99),
  (1005, 4, '2026-03-08', 'cancelled', 19.90);

INSERT INTO order_items (order_item_id, order_id, product_id, quantity, unit_price) VALUES
  (1, 1001, 101, 1, 1499.99),
  (2, 1001, 102, 2, 39.99),
  (3, 1002, 103, 1, 89.50),
  (4, 1002, 106, 1, 12.75),
  (5, 1003, 105, 1, 49.00),
  (6, 1004, 102, 1, 39.99),
  (7, 1005, 104, 1, 19.90);

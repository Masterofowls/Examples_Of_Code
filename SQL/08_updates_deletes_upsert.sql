-- 08_updates_deletes_upsert.sql

-- UPDATE example: increase price for Electronics by 5%
UPDATE products
SET price = ROUND(price * 1.05, 2)
WHERE category = 'Electronics';

-- Verify update
SELECT product_id, product_name, category, price
FROM products
WHERE category = 'Electronics'
ORDER BY product_id;

-- DELETE example: remove cancelled orders and their items
DELETE FROM order_items
WHERE order_id IN (
  SELECT order_id FROM orders WHERE status = 'cancelled'
);

DELETE FROM orders
WHERE status = 'cancelled';

-- Verify delete
SELECT order_id, status
FROM orders
ORDER BY order_id;

-- UPSERT examples (choose one syntax based on your database):

-- PostgreSQL
-- INSERT INTO products (product_id, product_name, category, price, stock_quantity)
-- VALUES (106, 'Notebook Set', 'Office', 14.00, 280)
-- ON CONFLICT (product_id)
-- DO UPDATE SET
--   price = EXCLUDED.price,
--   stock_quantity = EXCLUDED.stock_quantity;

-- MySQL
-- INSERT INTO products (product_id, product_name, category, price, stock_quantity)
-- VALUES (106, 'Notebook Set', 'Office', 14.00, 280)
-- ON DUPLICATE KEY UPDATE
--   price = VALUES(price),
--   stock_quantity = VALUES(stock_quantity);

-- 09_transactions_constraints.sql

-- Transaction example: move stock from one product to another as a correction
-- This demonstrates all-or-nothing behavior.

BEGIN;

UPDATE products
SET stock_quantity = stock_quantity - 5
WHERE product_id = 102 AND stock_quantity >= 5;

UPDATE products
SET stock_quantity = stock_quantity + 5
WHERE product_id = 103;

COMMIT;

-- Inspect results
SELECT product_id, product_name, stock_quantity
FROM products
WHERE product_id IN (102, 103)
ORDER BY product_id;

-- Optional rollback demo:
-- BEGIN;
-- UPDATE products SET stock_quantity = stock_quantity - 9999 WHERE product_id = 101;
-- ROLLBACK;

-- Then create a Table inside of that database called products.

DROP DATABASE IF EXISTS Bamazon;
CREATE database Bamazon;

USE Bamazon;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR (50) NULL,
  department_name VARCHAR (50) NULL,
  price DECIMAL (10,2) NULL,
  stock_quantity INT NULL, 
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

-- The products table should have each of the following columns:
-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)



-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
--Create
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lava Lamp", "Home Decor", "29.99", "100"), ("Jeans", "Apparel", "49.99", "100"), ("Samsung HD TV", "Electronics", "529.99", "100")

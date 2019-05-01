DROP DATABASE IF EXISTS BamazonDB;
CREATE DATABASE BamazonDB;
USE BamazonDB;

CREATE TABLE products (
    item_id INT AUTO-INCREMENT NOT NULL,
    product_name VARCHAR (100) NOT NULL,
    department_name VARCHAR (100) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    item_sales INT (10) NOT NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;


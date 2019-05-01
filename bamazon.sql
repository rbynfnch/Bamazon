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
INSERT INTO songs (product_name, department_name, price, stock_quantity)
VALUES ("Lava Lamp", "Home Decor", "29.99", "100"), ("Jeans", "Apparel", "49.99", "100"), ("Samsung HD TV", "Electronics", "529.99", "100"),
("Samsung HD TV", "Electronics", "529.99", "100"),
("Samsung HD TV", "Electronics", "529.99", "100"); 

INSERT INTO songs (title, artist, genre)
VALUES ("Moves Like Jagger", "Maroon 5", "Top 10"); 

INSERT INTO songs (title, artist, genre)
VALUES ("Party Rock Anthem", "LMFAO", "Today's Hits"); 

INSERT INTO songs (title, artist, genre)
VALUES ("Uptown Funk", "Mark Ronson", "Top 10");

INSERT INTO songs (title, artist, genre)
VALUES ("Call Me Maybe", "Carly Rae Jepson", "Classic"); 

INSERT INTO songs (title, artist, genre)
VALUES ("Dark Horse", "Katy Perry", "Top 10"); 

INSERT INTO songs (title, artist, genre)
VALUES ("Call Me", "Blondie", "Classic");




-- Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
-- The app should then prompt users with two messages.



-- The first should ask them the ID of the product they would like to buy.
-- The second message should ask how many units of the product they would like to buy.
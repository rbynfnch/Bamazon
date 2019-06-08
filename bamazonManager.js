var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

//List menu options

function start() {
    inquirer
    .prompt({
        name: "managerActions",
        type: "list",
        message: "Would you like to [1] View All Product for sale, [2] View Current Inventory, [3] Add NEW Product, OR [4] Add to Inventory?" ,
        choices: ["1", "2", "3", "4"]
    })
    .then(function(answer) {
        if (answer.managerActions === "1") {
            viewProduct();
        } else if (answer.managerActions === "2") {
            viewInventory();
        } else if (answer.managerActions === "3") {
            addProduct();
        } else if (answer.managerActions === "4") {
            addInventory();
        } else {
            connection.end();
        }
    });
}
//function to read all product
function viewProduct() {
   queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function(err, res) {
        if (err) throw err;
        console.log("Existing Inventory: ");
        console.log("===================================================\n");

        var strProdView = " ";
        for (var i = 0; i < res.length; i++) {
            strProdView = " ";
            strProdView += "Item Id: " + res[i].item_id + " // ";
            strProdView += "Product Name: " + res[i].product_name + " // ";
            strProdView += "Department: " + res[i].department_name + " // ";
            strProdView += "Price: $" + res[i].price + " // ";
            strProdView += "Quantity: " + res[i].stock_quantity + " \n ";
            
            console.log(strProdView);
        }
        
        console.log("=====================================================\n");
        // console.log(res);
        connection.end();
    });
}

//function to read all LOW inventory less than 5
function viewInventory() {
    
    queryStr = "SELECT * FROM products WHERE stock_quantity < 5";
    
    connection.query(queryStr, function(err, res) {
        if (err) throw err;
        // console.log(res);
        
        console.log("Low Inventory Items (below 5): ");
        console.log("===================================================\n");
        
        var strProdView = " ";
        for (var i = 0; i < res.length; i++) {
            strProdView = " ";
            strProdView += "Item Id: " + res[i].item_id + " // ";
            strProdView += "Product Name: " + res[i].product_name + " // ";
            strProdView += "Department: " + res[i].department_name + " // ";
            strProdView += "Price: $" + res[i].price + " // ";
            strProdView += "Quantity: " + res[i].stock_quantity + " \n ";
            
            console.log(strProdView);
        }
        
        console.log("===================================================\n");

         connection.end();
      });
}

// validateInteger makes sure that the user is supplying only positive integers for their inputs
function validateInteger(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

// validateNumeric makes sure that the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
	// Value must be a positive number
	var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Please enter a positive number for the unit price.'
	}
}

//funciton to add and create new product
function addProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "Please enter the name of the new product."
        },
        {
            type: "input",
            name: "department_name",
            message: "Please enter the department name."
        },
        {
            type: "input",
            name: "price",
            message: "What is the price per unit?",
            validate: validateNumeric
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "How many items are in stock?",
            validate: validateInteger
        }
    ]).then(function(input) {
        console.log("Add New Item: \n product_name = " + input.product_name + " \n " + 
        "department_name = " + input.department_name + " \n " +
        "price = " + input.price + " \n " +
        "stock_quantity = " + input.stock_quantity);

        //INSERT INTO table
        var queryStr = "INSERT INTO products SET ?";

        connection.query(queryStr, input, function (error, results, fields) {
            if (error) throw error;

            console.log("New product has been added to the inventory under Item ID " + results.insertId + ".");
            console.log("\n===================================================\n");

            connection.end();
        });
    })
}
//function to update inventory quantity

function addInventory() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            messge: "Please enter the Item ID for quantity update.",
            validate: validateInteger,
            filter: Number
        },
        {
            type: "input",
            name: "quantity",
            messge: "How many more would you like to add?",
            validate: validateInteger,
            filter: Number
        }
    ]).then(function(input) {

        var item = input.item_id;
        var addQuantity = input.quantity;

        var queryStr = "SELECT * FROM products WHERE ?";

        connection.query(queryStr, {item_id: item}, function(err, res) {
            if (err) throw err;

            if (res.length === 0) {
                console.log("ERROR: Invalid Item ID. Please select a valid Item ID. ");
                addInventory();               
            } else {
                var productRes = res[0];
                console.log("Updating Inventory...");

                //INSERT INTO table 
                var updateQueryStr = "UPDATE products SET stock_quantity = " + (productRes.stock_quantity + addQuantity) + " WHERE item_id = " + item;
                // console.log('updateQueryStr = ' + updateQueryStr);
            
                connection.query(updateQueryStr, function(err, res) {
                    if (err) throw err;

                    console.log("Stock count for Item ID " + item + " has been update to " + (productRes.stock_quantity + addQuantity) + ".");
                    console.log("\n===================================================\n");

                    connection.end();

                })
            
            }
        })
    })
    
}


// //View All Products for Sale
// // //View Low Inventory
// // Add to Inventory
// Add New Product


// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
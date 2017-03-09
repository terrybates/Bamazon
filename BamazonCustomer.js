
//Dependency for the program
var mysql = require("mysql");
var inquirer = require("inquirer");
//Make the connection to the mysql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "Bamazon"
});
  //connection status 
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});
//This list available product from database

var displayProduct = function(){
  

console.log("AVAILABLE ITEMS")
connection.query("SELECT * FROM product", function(err, res) {
  for (var i = 0; i < res.length; i++) {
    console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quanity);
  }
    console.log("-----------------------------------");
 
});

};
displayProduct();
  //Prompt the customer to place an order by selecting the item # and quantity.
  inquirer.prompt([{
    name: "item",
    type: "input",
    message: "What is the item number of the item you are ordering?",
    //Validates answer
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      else {
        console.log("\nPlease enter the correct item ID of the item you are ordering\n");            
        return false;
      }
    }       
  },
              
  {
    name: "amount",
    type: "input",
    message: "How many of the item do you want?",
    //validate answer
    validate: function(value) {
      if (isNaN(value) === false) {
       return true;
      }
      else {
       console.log("\nPlease enter a valid quantity.\n"); 
       return false;
      }
     }
   }]).then(function(answer) {
            var ItemInt = parseInt(answer.amount);

            //Queries the database
            connection.query("SELECT * FROM Product WHERE ?", [{item_id: answer.item}], function(err, data) {
                if (err) throw err;

                //Checks if sufficient quantity exists
                if (data[0].stock_quanity < ItemInt) {
                    console.log("We're sorry, that product is currently out of stock\n");
                    console.log("Please choose another product\n");
                    displayProduct();
                } else {

                    //If quantity exists updates database
                    var updateQty = data[0].stock_quanity - ItemInt;
                    var totalPrice = data[0].price * ItemInt;
                    connection.query('UPDATE product SET stock_quanity = ? WHERE item_id = ?', [updateQty, answer.item], function(err, results) {
                        if(err) {
                            throw err;
                        } else {
                          //This the total cost of the order.
                            console.log("Purchase complete!\n");
                            console.log("Your total cost is: $ " + totalPrice);
                            displayProduct();
                          }        
                    
                            
                
                        
                    });
                  }
               });
            });
        
const bodyParser = require("body-parser");
const express = require("express");

const serverConfig = require("./configs/server.config");

const app = express();

app.use(bodyParser.json());
//table initiali
const db = require("./models");
const Category = db.category;
const Product = db.product;
console.log(Category);

//1 to many relation between category & products

Category.hasMany(Product);

//create table
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("table is dropped and recreated");
    init();
  })
  .catch((err) => {
    console.log(err.message);
  });

//init function executed at the beginning of app

function init() {

  
  var categories = [
    {
      name: "Electronics",
      description: "This category will have all electronics items",
    },
    {
      name: "KitchenItems",
      description: "This category will have all kitchen related items",
    },
  ];

  Category.bulkCreate(categories)
    .then(() => {
      console.log("categories are added");
    })
    .catch((err) => {
      console.log("Error in initialising the categories", e.message);
    });
}

//initialise routes

require("./routes/category.routes")(app);
require("./routes/product.routes")(app);

app.listen(process.env.PORT, () => {
  console.log("Application started on port no :", serverConfig.PORT);
});

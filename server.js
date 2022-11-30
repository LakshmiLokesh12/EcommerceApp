const bodyParser = require('body-parser');
const express = require('express');
const serverConfig = require('./configs/server.config');
 
const app = express();

app.use(bodyParser.json());
//table initiali
const db = require("./models");
const Category = db.category;
console.log(Category);

//create table
db.sequelize.sync({force:true}).then(()=>{
    console.log("table is dropped and recreated");
}).catch(err=>{
    console.log(err.message);
})

//initialise routes


require('./routes/category.routes')(app);


app.listen(process.env.PORT, ()=>{
    console.log("Application started on port no :",serverConfig.PORT);

})
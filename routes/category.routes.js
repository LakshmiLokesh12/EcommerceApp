const controller = require('../controllers/category.controller');
const {requestValidator} = require("../middlewares");




module.exports = function(app){

    app.post('/EcommerceApp/api/v1/categories',[requestValidator.validateCategoryRequest], controller.create);
    app.get('/EcommerceApp/api/v1/categories', controller.findAll);
    app.get('/EcommerceApp/api/v1/categories/:id', controller.findOne);
    app.put('/EcommerceApp/api/v1/categories/:id',[requestValidator.validateCategoryRequest],controller.update)
    app.delete('/EcommerceApp/api/v1/categories/:id',controller.delete)

}
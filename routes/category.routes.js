const controller = require('../controllers/category.controller');
const {requestValidator, authJwt} = require("../middlewares");




module.exports = function(app){

    app.post('/EcommerceApp/api/v1/categories',[authJwt.verifyToken,authJwt.isAdmin,requestValidator.validateCategoryRequest], controller.create);
    app.get('/EcommerceApp/api/v1/categories', controller.findAll);
    app.get('/EcommerceApp/api/v1/categories/:id', controller.findOne);
    app.put('/EcommerceApp/api/v1/categories/:id',[requestValidator.validateCategoryRequest],controller.update)
    app.delete('/EcommerceApp/api/v1/categories/:id',[authJwt.verifyToken,authJwt.isAdmin],controller.delete)

}
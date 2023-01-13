
const productController = require('../controllers/product.controller');

const {requestValidator,authJwt} = require("../middlewares");
module.exports = (app)=>{
    app.post('/EcommerceApp/api/v1/products',[authJwt.verifyToken,authJwt.isAdmin,requestValidator.validateProductRequest],productController.create);
    app.get('/EcommerceApp/api/v1/products',productController.findAll);
    app.get('/EcommerceApp/api/v1/products/:id',productController.findOne);
    app.put('/EcommerceApp/api/v1/products/:id',[authJwt.verifyToken,authJwt.isAdmin],productController.update);
    app.delete('/EcommerceApp/api/v1/products/:id',[authJwt.verifyToken,authJwt.isAdmin],productController.delete)




}
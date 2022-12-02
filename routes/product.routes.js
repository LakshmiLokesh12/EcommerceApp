
const productController = require('../controllers/product.controller');

const {requestValidator} = require("../middlewares");
module.exports = (app)=>{
    app.post('/EcommerceApp/api/v1/products',[requestValidator.validateProductRequest],productController.create);
    app.get('/EcommerceApp/api/v1/products',productController.findAll);
    app.get('/EcommerceApp/api/v1/products/:id',productController.findOne);
    app.put('/EcommerceApp/api/v1/products/:id',[[requestValidator.validateProductRequest]],productController.update);
    app.delete('/EcommerceApp/api/v1/products/:id',productController.delete)




}
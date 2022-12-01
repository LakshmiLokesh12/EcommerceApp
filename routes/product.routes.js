
const productController = require('../controllers/product.controller');


module.exports = (app)=>{
    app.post('/EcommerceApp/api/v1/products',productController.create);
    app.get('/EcommerceApp/api/v1/products',productController.findAll);
    app.get('/EcommerceApp/api/v1/products/:id',productController.findOne);
    app.put('/EcommerceApp/api/v1/products/:id',productController.update);
    app.delete('/EcommerceApp/api/v1/products/:id',productController.delete)




}
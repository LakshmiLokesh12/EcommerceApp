const controller = require('../controllers/category.controller');

module.exports = function(app){

    app.post('/EcommerceApp/api/v1/categories', controller.create);
    app.get('/EcommerceApp/api/v1/categories', controller.findAll);
    app.get('/EcommerceApp/api/v1/categories/:id', controller.findOne);
    app.put('/EcommerceApp/api/v1/categories/:id',controller.update)
    app.delete('/EcommerceApp/api/v1/categories/:id',controller.delete)

}
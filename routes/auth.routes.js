const authController = require("../controllers/auth.controller")


module.exports = (app) =>{

    app.post('/EcommerceApp/api/v1/auth/signup',authController.signup);
    app.post('/EcommerceApp/api/v1/auth/signin',authController.signin)

    
}
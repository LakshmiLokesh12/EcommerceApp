const authController = require("../controllers/auth.controller")

const {verifySignUp} = require("../middlewares");
module.exports = (app) =>{

    app.post('/EcommerceApp/api/v1/auth/signup',[verifySignUp.checkDuplicateUsernameOrEmail,verifySignUp.checkRolesExisted],authController.signup);
    app.post('/EcommerceApp/api/v1/auth/signin',authController.signin)

    
}
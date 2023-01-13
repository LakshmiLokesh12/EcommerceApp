const { authJwt } = require("../middlewares");
const cartController = require("../controllers/cart.controller")

module.exports = (app)=>{
   
    app.post("/EcommerceApp/api/v1/carts", [authJwt.verifyToken],cartController.create);

    app.put("/EcommerceApp/api/v1/carts", [authJwt.verifyToken],cartController.update);
}
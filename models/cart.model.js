module.exports = (sequelize, Sequelize) =>{
    const Cart = sequelize.define("cart", {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autiIncrement : true
        },
        cost : {
            type : Sequelize.INTEGER
        }
    });
    return Cart;
}
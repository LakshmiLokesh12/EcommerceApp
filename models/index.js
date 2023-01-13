//functionalities of all models
const Sequelize = require('sequelize');
const config = require('../configs/db.config');
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host : config.HOST,
        dialect : config.dialect,
        pool : {
            max : config.pool.max,
            min : config.pool.min,
            acquire : config.pool.acquire,
            idle : config.pool.idle
        }
    }
);

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model')(sequelize,Sequelize);
db.product = require('./product.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.cart = require('./cart.model')(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
    through : "user_roles",
    foreignKey : "roleId",
    otherKey : "userId"
})

db.user.belongsToMany(db.role, {
    through : "user_roles",
    foreignKey : "userId",
    otherKey : "roleId"
})

//relation between user &cart 1-many
//cart and product is many to many
db.user.hasMany(db.cart);
db.product.belongsToMany(db.cart, {
    through : "cart_products",
    foreignKey : "productId",
    otherkey : "cartId"
});
db.cart.belongsToMany(db.product,{
    through : "cart_products",
    foreignKey : "cartId",
    otherKey : "productId"
})



db.ROLES = ["customer" , "admin"]

module.exports = db;

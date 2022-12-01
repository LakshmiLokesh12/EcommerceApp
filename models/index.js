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
module.exports = db;

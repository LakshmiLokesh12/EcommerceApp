module.exports = (sequelize, Sequelize) =>{
    const Role = sequelize.define("roles",{
        id :{
            type : Sequelize.INTEGER,
            primarykey : true
        },
        name : {
            type : Sequelize.STRING
        }
    });
    return Role;
}
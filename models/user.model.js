//contains the schema details of user
module.exports = ( sequelize, Sequelize ) => {
    const User = sequelize.define("user",{
        username : {
            type : this.Sequelize.STRING
        },
        email : {
            type : this.Sequelize.STRING
        },
        password :{
            type : this.Sequelize.STRING
         
        }
    });

    return User;

}
module.exports = {
    development :{
    HOST :"localhost",
    USER :"root",
    PASSWORD : "mysql",
    DB : "ecom_db",
    dialect : "mysql",
    pool : {
        max : 5,
        min : 0,
        acquire : 30000,
        idle : 1000
    }
},
production :{
    HOST : "sql12.freemysqlhosting.net",
    USER: "sql12600074",
    DB: "sql12600074",
    PASSWORD : "ENbptNLQpJ",
    dialect : "mysql",
    pool :{
        max :5,
        min : 0,
        acquire : 30000,
        idle :10000
    }
}
}
module.exports = {
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
}
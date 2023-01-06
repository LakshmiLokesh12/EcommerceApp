
const jwt = require("jsonwebtoken");
const config = require("../configs/secret.config");

const db = require("../models");
const User = db.user;

verifyToken = (req,res,next)=>{
    var token = req.headers['x-access-token'];


    if (!token){
        return res.status(403).send({
            message: "No token provided"
        });
        
    }

    jwt.verify(token,config.secret,(err,decodedTken)=>{
        if(err){
            res.status(401).send({
                message : "Unauthorized"
            });
            return ;

        }

        req.userId = decodedToken.id;
        next();

    })

}
//using userId fetchthe user object is Admin?
isAdmin = (req,res,next)=>{
    User.findByPk(req.userId).then(user=>{
        user.getRoles().then(roles=>{
            for(let i=0;i<roles.length;i++){
                if(roles[i].name == 'admin'){
                    next();
                    
                }
            }
            res.status(403).send({
                message : "Requires admin role"
            });
            return;
        })
    })

}



const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}
module.exports= authJwt;
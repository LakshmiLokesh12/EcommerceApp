//validation for duplicate email or username

//const { user } = require("../models")
//const { ROLES } = require("../models");
const db = require("../models");
const User = db.user;
const ROLES= db.ROLES;

const checkDuplicateUsernameOrEmail = (req,res,next)=>{


    //checking username
    User.findOne({
        where : {
            username : req.body.username
        }
    }).then (user =>{
        if(user){
            
        res.status(400).send({
            message :"Failed!!, Username already exists"
        });
        return;
    }
    User.findOne({
        where : {
            email : req.body.email
        }
    }).then(user=>{
        if(user){
            
        res.status(400).send({
            message : "Failed!!,email already exists"
        });
        return;
        }
        next();

    })


    })

   
}

//validation for correct roles
//validation if username & email is valid?

const checkRolesExisted = (req,res,next)=>{
    if(req.body.roles){
        for(let i= 0;i<req.body.roles.length;i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message : "Failed ! Role does not exist" + req.body.roles[i]

                })
                return;


            }
        }
        next();

    }

    
      
}


const verifySignUp = {
    checkDuplicateUsernameOrEmail : checkDuplicateUsernameOrEmail,
    checkRolesExisted : checkRolesExisted

}
module.exports = verifySignUp;
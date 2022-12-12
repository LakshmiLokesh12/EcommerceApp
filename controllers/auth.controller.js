//
const bcrypt = require('bcryptjs');
const { user} = require('../models');


const db = require('../models');

const User = db.user;
const Role = db.roles;

const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const secretKey = require('../configs/secret.config.js');


exports.signup = (req, res) => {
    
    const userObj = {
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8)
    }

    User.create(userObj).then(user=>{
        console.log("User created");

        if(req.body.roles){

            Role.findAll({
                where : {
                    name : {

                        [Op.or] : req.body.roles

                    }
                }
            }).then(roles=>{

                user.setRoles(roles).then(()=>{
                    console.log("registration completed")
                    res.status(201).send({
                        message : "User successfully registered"
                    })
                })

            })



        }else {
/*
            Role.findOne({
                where : {
                    name : 'customer'
                }
            }).then(roles =>{
                User.setRoles([role]).then(()=>{
                    console.log("registration completed")
                    res.status(201).send({
                        message : "User successfully registered"
                    })
                })       
            })
*/
            //another way of else part
              User.setRoles([1]).then(()=>{
                    console.log("registration completed")
                    res.status(201).send({
                        message : "User successfully registered"
              })
              })
             

        }
    }).catch(err=>{
        console.log("Error while creating user", err.message);
        res.status(500).send({
            message : "Some internal error"
        })
    })
    


}




//Handler for signin


exports.signin = (req,res)=>{

    User.findOne({
        where : {
            email : req.body.email
        }
    }).then(user =>{
        if(!user){
            res.status(404).send({
                message : "User not found"
            })
            return;
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!passwordIsValid){
            res.status(401).send({
                message : "Invalid password"
            })
        }

        var token = jwt.sign({id : user.id} ,secretKey.secret,{
            expiresIn : 300
        } )

    })
    
}


//
const bcrypt = require('bcryptjs')

const db = require('../models');
const User = db.user;
const Role = db.roles;

const Op = db.Sequelize.Op;

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

                User.setRoles(roles).then(()=>{
                    console.log("registration completed")
                    res.status(201).send({
                        message : "User successfully registered"
                    })
                })

            })



        }else {

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

            /**another way of else part
             * user.setRoles([1]).then(()=>{
                    console.log("registration completed")
                    res.status(201).send({
                        message : "User successfully registered"
             * })
             * })
             */

        }
    }).catch(err=>{
        console.log("Error while creating user", err.message);
        res.status(500).send({
            message : "Some internal error"
        })
    })
    


}
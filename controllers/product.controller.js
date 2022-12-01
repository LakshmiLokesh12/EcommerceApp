
const db = require('../models');
const Product = db.product;
exports.create = (req, res)=>{


    const prod = {
        name : req.body.name,
        description : req.body.description,
        cost : req.body.cost
    }

    Product.create(prod).then(product=>{
        console.log("Product added in database with name", prod.name);
        res.status
        (201).send(product);
    }).catch(err =>{
        console.log("Error while adding product with name", prod.name);
        res.status(500).send({
            message : "Some internal error"
        })
    })

}

exports.findAll = (req,res)=>{
    Product.findAll().then(products =>{
        res.status(200).send(products);
    }).catch(err =>{
        res.status(500).send({
            message : "Some internal error"
        })
    })
}

exports.findOne = (req,res)=>{
    const productId = req.params.id;
   
    Product.findByPk(productId).then(productId =>{
        res.status(200).send(productId);
    }).catch(err =>{
        res.status(500).send({
            message : "some internal error"
        })
    })
}

exports.update = (req,res)=>{

    const product = {
        name : req.body.name,
        description : req.body.description
    }

    const productId = req.params.id;

    Product.update(product,{
        where : {id : productId},
        returning : true
    }).then(updatedProduct =>{
        
       console.log(updatedProduct);
       Product.findByPk(productId).then(productRes =>{
        res.status(200).send(productRes);
       }).catch(err =>{
        res.status(500).send({
            message : "Some internal error"
        })
       })
       
        
    }).catch(err=>{
        res.status(500).send({
            message : "Some internal error"
        })
    })


}

const { product } = require("../models");
const db = require("../models");
const Cart = db.cart;




//creating cart
exports.create = (req, res) =>{
    const cart = {
        userId : req.userId
    };

    //const itemId = req.body.items;
    Cart.create(cart).then(cart =>{
        res.status(201).send(cart)
    }).catch(err=>{
        res.status(500).send({
            message : "Some internal error happened"
        })
    })
}

//updating
exports.update = (req,res) =>{

    const cartId = req.params.id;

    Cart.findByPk(cartId).then(cart =>{
        console.log(cart);

        //add products to the cart
        var productIds = req.body.productIds;

        product.findAll({
            where : {
                id : productIds
            }
        }).then(products => {
            if(!products){
                res.status(400).send({
                    message : "Products trying to add doesnot exist"
                });
                return;
            }

            cart.setProducts(products).then(()=>{
                console.log("Products successfully added to thecart");
                var cost = 0;
                var productsSelected = [];
                cart.getProducts().then(products => {
                    for (i = 0; i < products.length; i++) {
                        cost = cost + products[i].cost;
                        productsSelected.push({
                            id: products[i].id,
                            name: products[i].name,
                            cost: products[i].cost
                        });
                    }

                    res.status(200).send({
                        id: cart.id,
                        productsSelected: productsSelected,
                        cost: cost
                    });
            });
        })

        next();

                    
        })
    })
}

//search based on ID
exports.getCart = (req,res) =>{
    const cartId = req.params.cartId;
    Cart.findByPk(cartId).then(cart=>{
        var cost = 0;
        const productsSelected = [];
        cart.getProducts().then(products => {
            for (i = 0; i < products.length; i++) {
                cost = cost + products[i].cost;
                productsSelected.push({
                    id: products[i].id,
                    name: products[i].name,
                    cost: products[i].cost
                });
            }

            res.status(200).send({
                id: cart.id,
                productsSelected: productsSelected,
                cost: cost
            });
        });


    });
}
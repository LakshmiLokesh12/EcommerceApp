//all logic for processing of request

const db = require('../models');
const Category = db.category;

exports.create = (req,res)=>{
    //create category obj
    const category = {
        name : req.body.name,
        description : req.body.description
    }
    Category.create(category).then(category =>{
        console.log(`category name : [${category.name}] got inserted in the db`);
        res.status(201).send(category);
    }).catch(err =>{
        console.log(`Issue in inserting the category name : [ ${category.name}]. Error message : ${err.message}`);
        res.status(500).send({
            message : "Some internal error"
        })
    })

}



exports.findAll = (req, res) =>{
    const categoryName = req.query.name;

    let promise ;
    
    if(categoryName){
        promise = Category.findAll({
            where : {
                name : categoryName
            }
        });
    }else{
        promise = Category.findAll();
    }

        promise.then(categories =>{
            res.status(200).send(categories)
        }).catch(err =>{
            res.status(500).send({
                message : "Some internal error"
            })
        })
}

exports.findOne = (req,res)=>{
    const categoryId = req.params.id;
   
    Category.findByPk(categoryId).then(categoryId =>{
        res.status(200).send(categoryId);
    }).catch(err =>{
        res.status(500).send({
            message : "some internal error"
        })
    })
}


exports.update = (req,res)=>{

    const category = {
        name : req.body.name,
        description : req.body.description
    }

    const categoryId = req.params.id;

    Category.update(category,{
        where : {id : categoryId},
        returning : true
    }).then(updatedCategory =>{
       console.log(updatedCategory);
       Category.findByPk(categoryId).then(categoryRes =>{
        res.status(200).send(categoryRes);
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


exports.delete = (req, res) =>{
    const categoryId = req.params.id;
    Category.destroy({
        where : {
            id : categoryId
        }
    }).then(result =>{
        res.status(200).send({
            message : "Sucessfully deleted the message"
        })
    }).catch(err=>{
        res.status(500).send({
            message : "Some internal error"
        })
    })
}
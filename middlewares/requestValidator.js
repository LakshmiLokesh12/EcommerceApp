//middlewares for validating request

const { category } = require("../models");
const { product } = require("../models");
const validateCategoryRequest = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of the category is not provided",
    });
    return;
  }
  if (!req.body.description) {
    res.status(400).send({
      message: "Description of the category is not provided",
    });
    return;
  }

  next();
};


const validateProductRequest = (req,res,next)=>{
  if (!req.body.name) {
    res.status(400).send({
      message: "Name of the product is not provided",
    });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({
      message: "Description of the product is not provided",
    });
    return;
  }

  if (!req.body.cost|| req.body.cost<=0) {
    res.status(400).send({
      message: "Cost of the category is not provided",
    });
    return;
  }

  if (req.body.categoryId) {
    category.findByPk(req.body.categoryId).then(category=>{
      if(!category){
        res.status(400).send({
          message : "Category Id is not valid"
        })
        return;
      }
      next();
    })
  }else{
    res.status(400).send({
      message: "CategoryId is not provided",
    });
    return;
  }


 

}




module.exports = {
  validateCategoryRequest: validateCategoryRequest,
  validateProductRequest : validateProductRequest
};


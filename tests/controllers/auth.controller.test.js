

//test the signup method {
//@successfull signup(when we provide role to user /when we dont)
//@signup failed  }

const { mockRequest, mockResponse} = require("../interceptor");
const authController = require("../../../controllers/auth.controller");
const newUser = require("../mockData/newUser.json");


let req,res ;
beforeEach(()=>{
    //whatever i write here will be executed before every describe test
    req = mockRequest();
    res = mockResponse();
});

describe("Testing SignUp method of authController",()=>{
    it("Successfull sign up,when we provide the roles", ()=>{
        req.body = newUser
        authController.signup(req, res);
    })    

    it("Successfull sign up,when we don't provide the roles", ()=>{
        
    })  
    it("signUp failed", ()=>{
        
    })  

})




//test the sign in method
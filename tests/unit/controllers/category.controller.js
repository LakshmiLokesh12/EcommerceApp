const {mockRequest, mockResponse} = require("./interceptor");
const newCategory = require("../mockData/newCategory.json");
const Category = require("../../../models").category;
const categoryController = require("../../../controllers/category.controller");




beforeEach(()=>{
    req = mockRequest();
    res = mockResponse();
})



describe("Testing create category method",()=>{
    it('test successfull creation of a new Category', async() =>{
        req.body = newCategory
        const spy = jest.spyOn(Category,'create').mockImplementation((newCategory)=>Promise.resolve(newCategory))
        
        await categoryController.create(req,res);

        expect(spy).toHaveBeenCalled();
        expect(Category.create).toHaveBeenCalledWith(newCategory);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(newCategory);
    });

    it("test failure during creation of a category",()=>{

    });

})
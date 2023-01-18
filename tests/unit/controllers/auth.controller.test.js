//const jwt = require("jsonwebtoken");
//const config = require('../../../configs/auth.config');
const AuthController = require('../../../controllers/auth.controller');
const Models = require('../../../models');
const UserModel = Models.user;
const RoleModel = Models.role;
const newUser = require('../../mockData/userData.json');
const userData = require('../../mockData/userData.json');
const { mockRequest, mockResponse } = require("./interceptor");
const bcrypt = require("bcryptjs");
//
//

let req, res;

beforeEach(() =>{
    req = mockRequest();
    res = mockResponse();
})

describe('AuthController.signup', () => {

    beforeEach(() => {
        req.body = newUser;
    });

    const resFromCreate = {
        setRoles: async () => Promise.resolve(),
    }

    it('should return user registered success message', async () => {
        const spyOnCreate = jest.spyOn(UserModel, 'create')
                                .mockImplementation(() => Promise.resolve(resFromCreate)
                                );
        const spyOnFindAll = jest.spyOn(RoleModel, 'findAll')
                                .mockImplementation(() => Promise.resolve()
                                );

        await AuthController.signup(req, res);
        
        await expect(spyOnCreate).toHaveBeenCalled();
        await expect(spyOnFindAll).toHaveBeenCalled();
        await expect(UserModel.create).toHaveBeenCalled();
        await expect(RoleModel.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({ message: "User registered successfully!" });    
    });

    it('should return user registered success message when no roles is passed', async () => {
        const spyOnCreate = jest.spyOn(UserModel, 'create')
                                .mockImplementation(() => Promise.resolve(resFromCreate)
                                );
        const spyOnFindAll = jest.spyOn(RoleModel, 'findAll')
                                .mockImplementation(() => Promise.resolve()
                                );
        req.body.roles = null;

        await AuthController.signup(req, res);
        
        await expect(spyOnCreate).toHaveBeenCalled();
        //await expect(spyOnFindAll).not.toHaveBeenCalled();
        await expect(UserModel.create).toHaveBeenCalled();
        await expect(RoleModel.findAll).toHaveBeenCalledTimes(1);//in last test case
        await expect(res.send).toHaveBeenCalledWith({ message: "User registered successfully!" });    
    });

    it('should return error message', async () => {
        const spyOnCreate = jest.spyOn(UserModel, 'create')
                                .mockImplementation(() => Promise.reject(Error('This is an Error'))
                                );
        const spyOnFindAll = jest.spyOn(RoleModel, 'findAll')
                                .mockImplementation(() => Promise.resolve()
                                );
        req.body.roles = null;

        await AuthController.signup(req, res);
        
        await expect(spyOnCreate).toHaveBeenCalled();
        //await expect(spyOnFindAll).not.toHaveBeenCalled();
        await expect(UserModel.create).toHaveBeenCalled();
        //await expect(RoleModel.findAll).not.toHaveBeenCalled();
        expect(res.send).toHaveBeenCalledWith({ message: "This is an Error" });    
    });
});
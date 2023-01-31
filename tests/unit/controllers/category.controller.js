const { mockRequest, mockResponse } = require("../interceptor");
const newCategory = require("../mockData/newCategory.json");
const Category = require("../../../models").category;
const categoryController = require("../../../controllers/category.controller");

beforeEach(() => {
  req = mockRequest();
  res = mockResponse();
});

describe("Testing create category method", () => {
  it("test successfull creation of a new Category", async () => {
    req.body = newCategory;
    const spy = jest
      .spyOn(Category, "create")
      .mockImplementation((newCategory) => Promise.resolve(newCategory));

    await categoryController.create(req, res);

    expect(spy).toHaveBeenCalled();
    expect(Category.create).toHaveBeenCalledWith(newCategory);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(newCategory);
  });

  it("test failure during creation of a category", async () => {
    const spy = jest
      .spyOn(CategoryModel, "create")
      .mockImplementation(() => Promise.reject(Error("This is an error.")));

    await CategoryController.create(req, res);

    await expect(spy).toHaveBeenCalled();
    expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Some Internal error while storing the category!",
    });
  });
});

describe("CategoryController.findAll", () => {
  it("should call CategoryController.findAll method with empty query value", async () => {
    const spy = jest
      .spyOn(CategoryModel, "findAll")
      .mockImplementation(() => Promise.resolve(newCategory));

    req.query = {
      name: "",
    };
    await CategoryController.findAll(req, res);

    expect(spy).toHaveBeenCalled();
    expect(CategoryModel.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(newCategory);
  });

  it("should call CategoryController.findAll method with a query value", async () => {
    const queryParam = {
      where: {
        name: "Electronics",
      },
    };
    const spy = jest
      .spyOn(CategoryModel, "findAll")
      .mockImplementation((queryParam) => Promise.resolve(newCategory));

    req.query = {
      name: "Electronics",
    };
    await CategoryController.findAll(req, res);

    expect(spy).toHaveBeenCalled();
    expect(CategoryModel.findAll).toHaveBeenCalledWith(queryParam);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(newCategory);
  });

  it("should call CategoryController.findAll method and ends with a error", async () => {
    const spy = jest
      .spyOn(CategoryModel, "findAll")
      .mockImplementation(() => Promise.reject(Error("This is an error.")));

    await CategoryController.findAll(req, res);

    await expect(spy).toHaveBeenCalled();
    expect(CategoryModel.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Some Internal error while fetching all the categories",
    });
  });
});

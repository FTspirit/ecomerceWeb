/* eslint-disable camelcase */
const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const catchAsync = require('../helpers/catchAsync');
const { categoryService } = require('../services/index');
const messageError = require('../config/messageError');

const listCategoryController = catchAsync(async (req, res) => {
  const { id } = req.body;
  let listCategory;
  if (id) {
    listCategory = await categoryService.listCategory(id);
  } else {
    listCategory = await categoryService.listProduct();
  }
  return res.status(200).send(listCategory);
});

const createCategoryController = catchAsync(async (req, res) => {
  const { category_name, category_image } = req.body;
  const categoryData = {
    category_name: category_name || null,
    category_image: category_image || null,
  };
  const createData = await categoryService.createCategory(categoryData);
  res.status(200).send(createData);
});

const updateCategoryController = catchAsync(async (req, res) => {
  const { category_id, category_name, category_image } = req.body;
  const categoryDataUpdate = await categoryService.listCategoryById(category_id);
  if (categoryDataUpdate) {
    throw new ApiError(httpStatus, messageError.InternalServerError.vn);
  }
  categoryDataUpdate.category_name = category_name || categoryDataUpdate.category_name;
  categoryDataUpdate.category_image = category_image || categoryDataUpdate.category_image;

  res.status(200).send({ message: 'Update data successfuly!!' });
});

const deleteCategoryController = catchAsync(async (req, res) => {
  const { category_id } = req.body;
  const categoryDataUpdate = await categoryService.listCategoryById(category_id);
  if (categoryDataUpdate) {
    throw new ApiError(httpStatus, messageError.InternalServerError.vn);
  }
  await categoryDataUpdate.save();
  res.status(200).send('Delete category successfully!');
});

module.exports = {
  listCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
};

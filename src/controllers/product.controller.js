/* eslint-disable camelcase */
const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const catchAsync = require('../helpers/catchAsync');
const { productService } = require('../services/index');
const messageError = require('../config/messageError');

const listProductController = catchAsync(async (req, res) => {
  const { id } = req.body;
  let listProduct;
  if (id) {
    listProduct = await productService.listProductById(id);
  } else {
    listProduct = await productService.listProduct(id);
  }
  return res.status(200).send(listProduct);
});

const createProductController = catchAsync(async (req, res) => {
  const { name, description, rating, price, sale_price, category_id, image, feedback_by_id } = req.body;
  const productData = {
    name: name || null,
    description: description || null,
    rating: rating || null,
    price: price || null,
    sale_price: sale_price || null,
    category_id: category_id || null,
    image: image || null,
    feedback_by_id: feedback_by_id || null,
  };
  const createData = await productService.createProduct(productData);
  res.status(200).send(createData);
});

const updateProductController = catchAsync(async (req, res) => {
  const { product_id, name, description, rating, price, sale_price, category_id, image, feedback_by_id } = req.body;
  const productDataUpdate = await productService.listProductById(product_id);
  if (productDataUpdate) {
    throw new ApiError(httpStatus, messageError.InternalServerError.vn);
  }
  productDataUpdate.name = name || productDataUpdate.name;
  productDataUpdate.description = description || productDataUpdate.description;
  productDataUpdate.rating = rating || productDataUpdate.rating;
  productDataUpdate.price = price || productDataUpdate.price;
  productDataUpdate.sale_price = sale_price || productDataUpdate.sale_price;
  productDataUpdate.category_id = category_id || productDataUpdate.category_id;
  productDataUpdate.image = image || productDataUpdate.image;
  productDataUpdate.feedback_by_id = feedback_by_id || productDataUpdate.feedback_by_id;

  res.status(200).send({ message: 'Update data successfuly!!' });
});

const deleteProductController = catchAsync(async (req, res) => {
  const { product_id } = req.body;
  const productDataUpdate = await productService.listProductById(product_id);
  if (productDataUpdate) {
    throw new ApiError(httpStatus, messageError.InternalServerError.vn);
  }
  await productDataUpdate.save();
  res.status(200).send('Delete product successfully!');
});

module.exports = {
  listProductController,
  createProductController,
  updateProductController,
  deleteProductController,
};

/* eslint-disable no-console */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const catchAsync = require('../helpers/catchAsync');
const { productService } = require('../services/index');
const messageError = require('../config/messageError');

const listProductController = catchAsync(async (req, res) => {
  const { id } = req.query;
  let listProduct;
  if (id) {
    listProduct = await productService.listProductById(id);
  } else {
    listProduct = await productService.listProduct(id);
  }
  return res.status(200).send(listProduct);
});

const createProductController = catchAsync(async (req, res) => {
  const { productDatas } = req.body;
  for (const product of productDatas) {
    const {
      tag,
      tag_line,
      hero_image,
      category,
      images,
      brand,
      title,
      info,
      type,
      connectivity,
      final_price,
      original_price,
      quantity,
      ratings,
      rate_count,
      path,
    } = product;
    try {
      const productDataCheck = await productService.listProductByName(title);
      if (productDataCheck) {
        continue;
      }
      const productData = {
        tag: tag || null,
        tag_line: tag_line || null,
        hero_image: hero_image || null,
        categorys: category || null,
        images: images || null,
        brand: brand || null,
        title: title || null,
        info: info || null,
        type: type || null,
        connectivity: connectivity || null,
        final_price: final_price || null,
        original_price: original_price || null,
        quantity: quantity || null,
        ratings: ratings || null,
        rate_count: rate_count || null,
        path: path || null,
      };
      const createData = await productService.createProduct(productData);
    } catch (error) {
      console.log(error);
    }
  }
  res.status(200).send({ message: 'Create product successfully!' });
});

const updateProductController = catchAsync(async (req, res) => {
  const {
    tag,
    tag_line,
    hero_image,
    product_id,
    category,
    image,
    brand,
    title,
    info,
    type,
    connectivity,
    final_price,
    original_price,
    quantity,
    ratings,
    rate_count,
    path,
  } = req.body;
  const productDataUpdate = await productService.listProductById(product_id);
  if (productDataUpdate) {
    throw new ApiError(httpStatus, messageError.InternalServerError.vn);
  }
  productDataUpdate.tag = tag || productDataUpdate.tag;
  productDataUpdate.tag_line = tag_line || productDataUpdate.tag_line;
  productDataUpdate.hero_image = hero_image || productDataUpdate.hero_image;
  productDataUpdate.category = category || productDataUpdate.category_id;
  productDataUpdate.image = image || productDataUpdate.image;
  productDataUpdate.brand = brand || productDataUpdate.brand;
  productDataUpdate.title = title || productDataUpdate.title;
  productDataUpdate.info = info || productDataUpdate.info;
  productDataUpdate.type = type || productDataUpdate.type;
  productDataUpdate.connectivity = connectivity || productDataUpdate.connectivity;
  productDataUpdate.final_price = final_price || productDataUpdate.final_price;
  productDataUpdate.original_price = original_price || productDataUpdate.original_price;
  productDataUpdate.quantity = quantity || productDataUpdate.quantity;
  productDataUpdate.ratings = ratings || productDataUpdate.ratings;
  productDataUpdate.rate_count = rate_count || productDataUpdate.rateCount;
  productDataUpdate.path = path || productDataUpdate.path;

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

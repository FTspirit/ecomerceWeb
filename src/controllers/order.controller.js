/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../helpers/ApiError');
const catchAsync = require('../helpers/catchAsync');
const { orderService, orderDetailService } = require('../services/index');
const messageError = require('../config/messageError');

const listCategoryController = catchAsync(async (req, res) => {});

const createOrderController = catchAsync(async (req, res) => {
  const { total_amount, customer_id, address, is_delivery, payment, payment_status, product_data } = req.body;
  const tracking_number = uuidv4();
  const orderData = {
    total_amount: total_amount || null,
    customer_id: customer_id || null,
    address: address || null,
    tracking_number: tracking_number || null,
    is_delivery: is_delivery || null,
    payment: payment || null,
    payment_status: payment_status || null,
  };
  const createData = await orderService.createOrder(orderData);
  const orderDetailData = [];
  for (let i = 0; i < product_data.length; i++) {
    const productData = {
      order_id: createData.id,
      product_id: product_data[i].product_id,
      amount: product_data[i].amount,
      price: product_data[i].price,
    };
    await orderDetailService.createOrderDetail(productData);
    orderDetailData.push(productData);
  }
  createData.order_detail = orderDetailData;
  res.status(200).send(createData);
});

const updateCategoryController = catchAsync(async (req, res) => {
  const { tracking_number, total_amount, customer_id, address, is_delivery, payment, payment_status } = req.body;
});

const deleteCategoryController = catchAsync(async (req, res) => {});

module.exports = {
  listCategoryController,
  createOrderController,
  updateCategoryController,
  deleteCategoryController,
};

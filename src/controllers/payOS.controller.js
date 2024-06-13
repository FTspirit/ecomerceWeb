/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
const PayOS = require('@payos/node');
const catchAsync = require('../helpers/catchAsync');
const ApiError = require('../helpers/ApiError');
const orderService = require('../services/order.service');

const payos = new PayOS(
  'f7592266-fa7d-42e7-a341-fb63ac138a76',
  'aaee0bec-1c12-4d01-9ec9-aba7c05a57a8',
  'df01c9285003d552e226d46f17326ffda8c217de492ea8e674ecac64403f344a'
);

const receiveDataHook = catchAsync(async (req, res) => {
  const { data, code, desc } = req.body;
  console.log('data', data);
  console.log('code', code);
  console.log('desc', desc);
  res.status(200).send({ code: '00', desc: 'success' });
});

const confirmPayOsWebhook = catchAsync(async (req, res) => {
  const { webhookUrl } = req.body;
  try {
    const updateWebhook = await payos.confirmWebhook(webhookUrl);
    res.status(200).send({ webhookData: updateWebhook });
  } catch (error) {
    throw new ApiError(500, 'Hệ thống đang bảo trì vui lòng thử lại sau!');
  }
});

const createPaymentPayosController = catchAsync(async (req, res) => {
  const { amount, description, orderCode } = req.body;
  const order = {
    amount,
    description,
    orderCode,
    returnUrl: 'http://10.10.60.103:9876/success',
    cancelUrl: 'http://10.10.60.103:9876/error',
  };
  try {
    const paymentLink = await payos.createPaymentLink(order);
    res.status(200).send({ orderUrl: paymentLink.checkoutUrl });
  } catch (error) {
    throw new ApiError(500, 'Hệ thống đang bảo trì vui lòng thử lại sau!');
  }
});

const updatePaymentStatus = catchAsync(async (req, res) => {
  const { order_id, status, cancel, code, id } = req.body;
  const checkOrder = await orderService.listOderById(order_id);
  if (code === '00' && status === 'paid') {
    checkOrder.payment_status = 'success';
  }
  res.status(200).send({ message: 'update successfully!!' });
});

module.exports = {
  createPaymentPayosController,
  receiveDataHook,
  confirmPayOsWebhook,
  updatePaymentStatus,
};

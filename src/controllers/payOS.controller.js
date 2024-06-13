/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
const PayOS = require('@payos/node');
const catchAsync = require('../helpers/catchAsync');
const ApiError = require('../helpers/ApiError');

const payos = new PayOS(
  'f7592266-fa7d-42e7-a341-fb63ac138a76',
  'aaee0bec-1c12-4d01-9ec9-aba7c05a57a8',
  'df01c9285003d552e226d46f17326ffda8c217de492ea8e674ecac64403f344a'
);

const createPaymentPayosController = catchAsync(async (req, res) => {
  const { amount, description, orderCode } = req.body;
  const order = {
    amount,
    description,
    orderCode,
    returnUrl: 'http://10.10.60.103:9875/success',
    cancelUrl: 'http://10.10.60.103:9875/error',
  };
  try {
    const paymentLink = await payos.createPaymentLink(order);
    res.status(200).send({ orderUrl: paymentLink.checkoutUrl });
  } catch (error) {
    throw new ApiError(500, 'Hệ thống đang bảo trì vui lòng thử lại sau!');
  }
});

module.exports = {
  createPaymentPayosController,
};

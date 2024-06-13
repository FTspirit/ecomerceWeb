/* eslint-disable no-console */
const crypto = require('crypto');
const axios = require('axios');
const catchAsync = require('../helpers/catchAsync');
const ApiError = require('../helpers/ApiError');

const config = {
  baseUrl: 'https://test-payment.momo.vn/v2/gateway/api',
};

const createPaymentController = catchAsync(async (req, res) => {
  const { amount, orderInfo } = req.body;
  const accessKey = 'F8BBA842ECF85';
  const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  const partnerCode = 'MOMO';
  const redirectUrl = 'http://localhost:3000/success';
  const ipnUrl = 'https://gofa.vn';
  const requestType = 'payWithMethod';
  const orderId = partnerCode + new Date().getTime();
  const requestId = orderId;
  const orderGroupId = '';
  const autoCapture = true;
  const lang = 'vi';
  const extraData = '';

  // before sign HMAC SHA256 with format
  // accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  // signature
  const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
  // json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode,
    partnerName: 'Test',
    storeId: 'MomoTestStore',
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    lang,
    requestType,
    autoCapture,
    extraData,
    orderGroupId,
    signature,
  });
  try {
    const response = await axios.post(`${config.baseUrl}/create`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    throw new ApiError(500, 'Hệ thống đang bảo trì vui lòng thử lại sau!');
  }
});

module.exports = {
  createPaymentController,
};

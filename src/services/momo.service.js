/* eslint-disable no-console */
const crypto = require('crypto');
const axios = require('axios');

const configMomo = {
  accessKey: 'F8BBA842ECF85',
  secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
  partnerCode: 'MOMO',
  requestType: 'payWithMethod',
  redirectUrl: 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b',
  ipnUrl: 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b',
  lang: 'vi',
  baseUrl: 'https://test-payment.momo.vn/v2/gateway/api',
};

const generateOrderId = (partnerCode) => `${partnerCode}${Date.now()}`;

const generateSignature = (config, orderId, requestId, amount, orderInfo = 'pay with MoMo', extraData = '') => {
  const rawSignature = `accessKey=${config.accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${config.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${config.partnerCode}&redirectUrl=${config.redirectUrl}&requestId=${requestId}&requestType=${config.requestType}`;
  return crypto.createHmac('sha256', config.secretKey).update(rawSignature).digest('hex');
};

const createRequestBody = (config, orderId, requestId, amount, signature) => ({
  partnerCode: config.partnerCode,
  partnerName: 'Test',
  storeId: 'MomoTestStore',
  requestId,
  amount,
  orderId,
  orderInfo: 'pay with MoMo',
  redirectUrl: config.redirectUrl,
  ipnUrl: config.ipnUrl,
  lang: config.lang,
  requestType: config.requestType,
  autoCapture: true,
  extraData: '',
  orderGroupId: '',
  signature,
});

const sendPaymentRequest = async (config, requestBody) => {
  try {
    const response = await axios.post(`${config.baseUrl}/create`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Status: ${response.status}`);
    console.log(`Headers: ${JSON.stringify(response.headers)}`);
    console.log('Body: ', response.data);
    console.log('resultCode: ', response.data.resultCode);
    return response.data;
  } catch (error) {
    console.error(`Problem with request: ${error.message}`);
    throw error;
  }
};

const createPayment = async (amount) => {
  const orderId = generateOrderId(configMomo.partnerCode);
  const requestId = orderId;
  const signature = generateSignature(configMomo, orderId, requestId, amount);
  const requestBody = createRequestBody(configMomo, orderId, requestId, amount, signature);

  const momoData = await sendPaymentRequest(configMomo, requestBody);
  return momoData;
};

module.exports = {
  createPayment,
};

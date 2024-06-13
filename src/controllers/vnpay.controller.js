const axios = require('axios');

const createPaymentController = async (req, res) => {
  const { amount, bankCode } = req.body;
  const vnpUrl = 'http://127.0.0.1:8888/order/create_payment_url';
  try {
    const response = await axios.post(vnpUrl, {
      amount,
      bankCode,
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  createPaymentController,
};

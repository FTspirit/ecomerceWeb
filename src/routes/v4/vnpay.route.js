const express = require('express');

const router = express.Router();
const { vnpayController } = require('../../controllers');

// list product
router.post('/create-payment', vnpayController.createPaymentController);

module.exports = router;

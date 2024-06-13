const express = require('express');

const router = express.Router();
const { momoController } = require('../../controllers');

// list product
router.post('/create-payment', momoController.createPaymentController);

module.exports = router;

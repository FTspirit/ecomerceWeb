const express = require('express');

const router = express.Router();
const { payOsController } = require('../../controllers');

// list product
router.post('/create-payment', payOsController.createPaymentPayosController);

router.post('/update-webhook', payOsController.confirmPayOsWebhook);

module.exports = router;

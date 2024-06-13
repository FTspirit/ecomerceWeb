const express = require('express');

const router = express.Router();
const { payOsController } = require('../../controllers');

// list product
router.post('/create-payment', payOsController.createPaymentPayosController);

module.exports = router;

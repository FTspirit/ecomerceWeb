const express = require('express');

const router = express.Router();
const { zaloController } = require('../../controllers');

// list product
router.post('/create-payment', zaloController.createPaymentController);

module.exports = router;

const express = require('express');

const router = express.Router();
const { orderController } = require('../../controllers');

// list product
router.post('/create', orderController.createOrderController);

module.exports = router;

const express = require('express');

const router = express.Router();
const { productController } = require('../../controllers');

// list product
router.get('/list-product', productController.listProductController);

// create product
router.post('/create-product', productController.createProductController);

// update product
router.post('/update-product', productController.updateProductController);

// delete product
router.post('/delete-product', productController.deleteProductController);

module.exports = router;

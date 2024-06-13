const express = require('express');

const router = express.Router();
const { categoryController } = require('../../controllers');

// list product
router.get('/list-category', categoryController.listCategoryController);

// create product
router.post('/create-category', categoryController.createCategoryController);

// update product
router.post('/update-category', categoryController.updateCategoryController);

// delete product
router.post('/delete-category', categoryController.deleteCategoryController);

module.exports = router;

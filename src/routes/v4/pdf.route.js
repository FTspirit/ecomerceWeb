const express = require('express');

const router = express.Router();
const { pdfController } = require('../../controllers');

// list product
router.post('/create', pdfController.createPdfController);

module.exports = router;

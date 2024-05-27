const db = require('../models');

// Import Model
const { products } = db;

/**
 * List all by product
 * @returns {Promise<products>}
 */
const listProduct = () => {
  return products.findAll();
};

/**
 * Find all product by ID
 * @returns {Promise<products>}
 */
const listProductById = (id) => {
  return products.findOne({
    where: {
      id,
    },
  });
};

/**
 * Create product
 * @returns {Promise<products>}
 */
const createProduct = (productData) => {
  return products.create(productData);
};

module.exports = {
  listProduct,
  listProductById,
  createProduct,
};

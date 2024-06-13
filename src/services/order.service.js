const db = require('../models');

// Import Model
const { order } = db;

/**
 * List all by service
 * @returns {Promise<category>}
 */
const listOrder = () => {
  return order.findAll();
};

/**
 * Find all cateogry by ID
 * @returns {Promise<category>}
 */
const listOderById = (id) => {
  return order.findOne({
    where: {
      id,
    },
  });
};

/**
 * Create category
 * @returns {Promise<category>}
 */
const createOrder = (categoryData) => {
  return order.create(categoryData);
};

module.exports = {
  listOrder,
  listOderById,
  createOrder,
};

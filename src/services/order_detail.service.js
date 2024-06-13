/* eslint-disable camelcase */
const db = require('../models');

// Import Model
const { order_detail } = db;

/**
 * List all by category
 * @returns {Promise<category>}
 */
const listOrder = () => {
  return order_detail.findAll();
};

/**
 * Find all cateogry by ID
 * @returns {Promise<category>}
 */
const listOderById = (id) => {
  return order_detail.findOne({
    where: {
      id,
    },
  });
};

/**
 * Create category
 * @returns {Promise<category>}
 */
const createOrderDetail = (orderDetailData) => {
  return order_detail.create(orderDetailData);
};

module.exports = {
  listOrder,
  listOderById,
  createOrderDetail,
};

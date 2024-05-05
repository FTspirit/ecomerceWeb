/* eslint-disable camelcase */
const db = require('../models');

// Import Model
const { secretKey } = db;

/**
 * Create one secret key
 * @param {object} secretKeyData
 * @returns {Promise<secretKey>}
 */
const createSecretKey = (secretKeyData) => {
  return secretKey.create(secretKeyData);
};

/**
 * Get secret key by customer_id
 * @param {object} secretKeyData
 * @returns {Promise<secretKey>}
 */
const findOneSecretKey = (customer_id) => {
  return secretKey.findOne({
    where: {
      customer_id,
    },
  });
};

/**
 * Delete all secret by customer_id
 * @param {string} customer_id
 * @returns {Promise<secretKey>}
 */
const deleteSecretkeyByCustomerId = (customer_id) => {
  return secretKey.destroy({
    where: {
      customer_id,
    },
  });
};

/**
 * Delete all secret by customer and device id
 * @param {string} customer_id
 * @returns {Promise<secretKey>}
 */

/**
 * Find all secret key by customer.id
 * @param {string} customer_id
 * @returns {Promise<secretKey>}
 */
const findAllSecretKey = (customer_id) => {
  return secretKey.findAll({
    where: {
      customer_id,
    },
  });
};

module.exports = {
  createSecretKey,
  findOneSecretKey,
  findAllSecretKey,
  deleteSecretkeyByCustomerId,
};

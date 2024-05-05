/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const db = require('../models');

// Import Model
const { customer } = db;

/**
 * Create one customer
 * @param {object} customerData
 * @returns {Promise<Customer>}
 */
const createCustomer = (customerData) => {
  return customer.create(customerData);
};

/**
 * Create one customer by phone number
 * @param {string} phoneNumber
 * @returns {Promise<Customer>}
 */
const createCustomerByPhone = (phoneNumber) => {
  return customer.create({
    phone_number: phoneNumber,
  });
};

/**
 * Get one customer by phone number
 * @param {string} phoneNumber
 * @returns {Promise<Customer>}
 */
const getOneCustomerByPhone = (phoneNumber) => {
  return customer.findOne({
    where: {
      phone_number: phoneNumber,
    },
  });
};

/**
 * Get one customer by customerId
 * @param {string} customerId
 * @returns {Promise<Customer>}
 */
const findOneCustomerById = (customerId) => {
  return customer.findOne({
    where: {
      id: customerId,
    },
  });
};

const findOneCustomerRefreshToken = (refresh_token) => {
  return customer.findOne({
    where: {
      refresh_token,
    },
  });
};

/**
 * Get all customer
 * @param {string} customerId
 * @returns {Promise<Customer>}
 */
const findAllCustomer = (customerData) => {
  return customer.findAll(customerData);
};

/**
 * Update refresh token
 * @param {string} refreshToken
 * @returns {Promise<Customer>}
 */
const updateRefreshTokenCustomer = (customerId) => {
  return customer.create({
    where: {
      id: customerId,
    },
  });
};

/**
 * Update list car for customer
 * @param {object} lisencePlateData
 * @returns {Promise<Customer>}
 */
const updateLicensePlateForCustomer = (lisencePlateData) => {
  return customer.update(
    { car_ids: lisencePlateData.listCar },
    {
      where: {
        id: lisencePlateData.customer_id,
      },
    }
  );
};

/**
 * Update password for customer
 * @param {string} password
 * @returns {Promise<Customer>}
 */
const updatePassword = (newPassword, oldPassword) => {
  return customer.update(
    { password: newPassword },
    {
      where: {
        password: oldPassword,
      },
    }
  );
};

/**
 * Get or create customer
 * @param {string} phoneNumber
 * @returns {Promise<Customer>}
 */
const getOrCreateCustomer = async (phoneNumber) => {
  let checkCustomer = await getOneCustomerByPhone(phoneNumber);
  if (!customer) {
    const customerData = { phone_number: phoneNumber, active: true, is_update_password: false };
    checkCustomer = await createCustomer(customerData);
  }
  return customer;
};

module.exports = {
  createCustomerByPhone,
  getOneCustomerByPhone,
  findOneCustomerById,
  findOneCustomerRefreshToken,
  findAllCustomer,
  updateRefreshTokenCustomer,
  updateLicensePlateForCustomer,
  createCustomer,
  updatePassword,
  getOrCreateCustomer,
};

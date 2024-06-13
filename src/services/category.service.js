/* eslint-disable camelcase */
const db = require('../models');

// Import Model
const { category } = db;

/**
 * List all by category
 * @returns {Promise<category>}
 */
const listCategory = () => {
  return category.findAll();
};

/**
 * Find all cateogry by ID
 * @returns {Promise<category>}
 */
const listCategoryById = (id) => {
  return category.findOne({
    where: {
      id,
    },
  });
};

/**
 * Find all cateogry by Name
 * @returns {Promise<category>}
 */
const listCategoryByName = (category_name) => {
  return category.findOne({
    where: {
      category_name,
    },
  });
};

/**
 * Create category
 * @returns {Promise<category>}
 */
const createCategory = (categoryData) => {
  return category.create(categoryData);
};

module.exports = {
  listCategory,
  listCategoryById,
  createCategory,
  listCategoryByName,
};

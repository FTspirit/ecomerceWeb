/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'name');
    await queryInterface.removeColumn('products', 'description');
    await queryInterface.removeColumn('products', 'rating');
    await queryInterface.removeColumn('products', 'price');
    await queryInterface.removeColumn('products', 'sale_price');
    await queryInterface.removeColumn('products', 'feedback_by_id');
  },

  down: async (queryInterface, Sequelize) => {},
};

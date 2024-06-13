/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('order', 'payment', {
      type: Sequelize.ENUM('payos', 'vnpay', 'zalopay', 'momo'),
      allowNull: false, // Assuming payment method is required
    });

    await queryInterface.addColumn('order', 'payment_status', {
      type: Sequelize.ENUM('pending', 'success', 'fail', 'cancel'),
      allowNull: false, // Assuming payment status is required
      defaultValue: 'pending', // Default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('order', 'payment');
    await queryInterface.removeColumn('order', 'payment_status');

    // To clean up ENUM types after removal
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_orders_payment";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_orders_payment_status";');
  },
};

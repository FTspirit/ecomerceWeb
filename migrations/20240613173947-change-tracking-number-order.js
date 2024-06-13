module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('order', 'tracking_number', {
      type: Sequelize.TEXT,
      allowNull: true, // Adjust based on your requirements
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('order', 'tracking_number', {
      type: Sequelize.INTEGER,
      allowNull: true, // Adjust based on your requirements
    });
  },
};

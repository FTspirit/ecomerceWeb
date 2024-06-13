module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rating: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      salePrice: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      category: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      image: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      feedbackById: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      updated_at: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  },
};

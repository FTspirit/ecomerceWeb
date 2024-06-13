/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'brand', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'tag', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'tagline', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'heroImage', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'title', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'info', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'type', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'connectivity', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'final_price', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'original_price', {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'ratings', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'rateCount', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn('products', 'path', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'brand');
    await queryInterface.removeColumn('products', 'title');
    await queryInterface.removeColumn('products', 'info');
    await queryInterface.removeColumn('products', 'type');
    await queryInterface.removeColumn('products', 'connectivity');
    await queryInterface.removeColumn('products', 'final_price');
    await queryInterface.removeColumn('products', 'original_price');
    await queryInterface.removeColumn('products', 'quantity');
    await queryInterface.removeColumn('products', 'ratings');
    await queryInterface.removeColumn('products', 'rateCount');
    await queryInterface.removeColumn('products', 'path');
  },
};

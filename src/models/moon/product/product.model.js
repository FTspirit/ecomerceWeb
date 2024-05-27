/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const Utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    'products',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
      rating: DataTypes.FLOAT,
      price: DataTypes.FLOAT,
      sale_price: DataTypes.FLOAT,
      category_id: DataTypes.INTEGER,
      image: DataTypes.ARRAY(DataTypes.TEXT),
      feedback_by_id: DataTypes.TEXT,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
    },
    {
      tableName: 'order',
    }
  );
  Products.beforeCreate(async (record, options) => {
    record.created_at = Utils.getCurrentTimeEpoch();
    record.updated_at = Utils.getCurrentTimeEpoch();
  });
  Products.beforeSave(async (record, options) => {
    record.updated_at = Utils.getCurrentTimeEpoch();
  });
  Products.associate = function (models) {
    Products.hasMany(models.order_detail, {
      foreignKey: 'orderId',
      as: 'order_detail',
    });
  };
  return Products;
};

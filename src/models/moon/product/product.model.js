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
      tag: DataTypes.TEXT,
      tag_line: DataTypes.TEXT,
      hero_image: DataTypes.TEXT,
      category: DataTypes.TEXT,
      images: DataTypes.ARRAY(DataTypes.TEXT),
      brand: DataTypes.TEXT,
      title: DataTypes.TEXT,
      info: DataTypes.TEXT,
      type: DataTypes.TEXT,
      connectivity: DataTypes.TEXT,
      final_price: DataTypes.FLOAT,
      original_price: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      rate_count: DataTypes.INTEGER,
      path: DataTypes.TEXT,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
    },
    {
      tableName: 'products',
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

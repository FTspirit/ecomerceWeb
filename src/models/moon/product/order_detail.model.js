/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const Utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const orderDetail = sequelize.define(
    'order_detail',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      name: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      amount: DataTypes.INTEGER,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
    },
    {
      tableName: 'order_detail',
    }
  );
  orderDetail.beforeCreate(async (record, options) => {
    record.created_at = Utils.getCurrentTimeEpoch();
    record.updated_at = Utils.getCurrentTimeEpoch();
  });
  orderDetail.beforeSave(async (record, options) => {
    record.updated_at = Utils.getCurrentTimeEpoch();
  });
  return orderDetail;
};

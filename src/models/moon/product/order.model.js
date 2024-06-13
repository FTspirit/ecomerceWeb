/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
const Utils = require('../../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'order',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total_amount: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      tracking_number: DataTypes.INTEGER,
      is_delivery: DataTypes.BOOLEAN,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
      payment: {
        type: DataTypes.ENUM('payos', 'vnpay', 'zalopay', 'momo'),
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM('pending', 'success', 'fail', 'cancel'),
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      tableName: 'order',
    }
  );
  Order.beforeCreate(async (record, options) => {
    record.created_at = Utils.getCurrentTimeEpoch();
    record.updated_at = Utils.getCurrentTimeEpoch();
  });
  Order.beforeSave(async (record, options) => {
    record.updated_at = Utils.getCurrentTimeEpoch();
  });
  Order.associate = function (models) {
    Order.hasMany(models.order_detail, {
      foreignKey: 'orderId',
      as: 'order_detail',
    });
  };
  return Order;
};

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line prettier/prettier
const { Model } = require('sequelize');
const utils = require('../../../helpers/utils');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'customer',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      phone_number: DataTypes.TEXT,
      password: DataTypes.TEXT,
      role: DataTypes.TEXT,
      fullname: DataTypes.TEXT,
      address: DataTypes.TEXT,
      email: DataTypes.TEXT,
      payment_type: DataTypes.INTEGER,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
    },
    {
      tableName: 'customer',
    }
  );
  Customer.beforeCreate(async (record, options) => {
    record.created_at = utils.getCurrentTimeEpoch();
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  Customer.beforeSave(async (record, options) => {
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  Customer.prototype.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };

  Customer.associate = function (models) {
    Customer.hasMany(models.order, {
      foreignKey: 'customerId',
      as: 'order'
    });
    Customer.hasMany(models.secret_key, {
      foreignKey: 'customerId',
      as: 'secret_key'
    });
  };

  return Customer;
};

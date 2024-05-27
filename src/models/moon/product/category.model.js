/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line prettier/prettier
const utils = require('../../../helpers/utils');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'category',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: DataTypes.STRING,
      category_image: DataTypes.STRING,
      created_at: DataTypes.INTEGER,
      updated_at: DataTypes.INTEGER,
    },
    {
      tableName: 'category',
    }
  );
  Category.beforeCreate(async (record, options) => {
    record.created_at = utils.getCurrentTimeEpoch();
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  Category.beforeSave(async (record, options) => {
    record.updated_at = utils.getCurrentTimeEpoch();
  });
  Category.associate = function (models) {
    // associations can be defined here
  };

  return Category;
};

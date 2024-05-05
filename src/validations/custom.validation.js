const { parsePhoneNumber } = require('awesome-phonenumber');
const Joi = require('joi');
const httpStatus = require('http-status');
const { HTTP_CODES_STATUS } = require('../config/http.code');
const ulti = require('../helpers/utils');

const otp = (value, helpers) => {
  if (value.length !== 6) {
    return helpers.message('otp must has 6 characters', {
      code: HTTP_CODES_STATUS.code_otp_must_has_6_characters,
    });
  }
  if (!/^[0-9]+$/.test(value)) {
    return helpers.message('otp must contain numbers', {
      code: HTTP_CODES_STATUS.code_otp_must_contain_numbers,
    });
  }
  return value;
};

const mobilePhone = (value, helpers) => {
  if (!parsePhoneNumber(value, { regionCode: 'VN' }).valid) {
    return helpers.message('mobile phone is invalid', {
      code: HTTP_CODES_STATUS.code_mobile_phone_is_invalid,
    });
  }
  return value;
};

function validFirstLicense8string(value) {
  const str = value || '';

  if (str.length === 0 || str.length !== 3) {
    return '';
  }

  const characterset = /^[a-zA-Z0-9]+$/;

  if (!characterset.test(str)) {
    return '';
  }

  const char1 = str[0];
  const char2 = str[1];
  const char3 = str[2];

  if (!isNaN(char1) && !isNaN(char2) && isNaN(char3)) {
    const resStr = char1 + char2 + char3.toUpperCase();
    return resStr;
  }

  return '';
}

function validSecondLicense8string(value) {
  let str = value || '';
  if (!/^\d+$/.test(str)) {
    return '';
  }
  if (str.length === 4) {
    return str;
  }
  if (str.length === 5) {
    str = str.slice(0, 3) + str.slice(3);
    return str;
  }
  return '';
}

const validLicensePlate = (value, helpers) => {
  const valueParse = ulti.removeCharacter(value[0]);
  if (valueParse.length === 8) {
    const part1 = valueParse.substring(0, 3);
    const part2 = valueParse.substring(3);
    const resultPart1 = validFirstLicense8string(part1);
    const resultPart2 = validSecondLicense8string(part2);
    if (resultPart1.length === 0 || resultPart2.length === 0) {
      return helpers.message('license plate is invalid', {
        code: httpStatus.BAD_REQUEST,
      });
    }
    return value;
  }
  if (valueParse.length > 10) {
    return helpers.message('license plate is invalid', {
      code: httpStatus.BAD_REQUEST,
    });
  }
  return value;
};

const validJoiLicensePlate = {
  body: Joi.object().keys({
    license_plate: Joi.required().custom(validLicensePlate),
  }),
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

module.exports = {
  otp,
  mobilePhone,
  validLicensePlate,
  validJoiLicensePlate,
  password,
};

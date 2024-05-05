/* eslint-disable no-param-reassign */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable import/no-unresolved */
const logger = require('../config/logger');

const getCurrentTime = () => new Date().toISOString();

const getCurrentTimeEpoch = () => parseInt(new Date().getTime() / 1000, 10);

module.exports.getCurrentTime = () => parseInt(new Date().getTime() / 1000);

const JSONParser = (data) => {
  try {
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    logger.error(`Error parsing JSON, ${error}`);
  }
};

const JSONStringify = (data) => {
  try {
    const result = JSON.stringify(data);
    return result;
  } catch (error) {
    logger.error(`Error parsing JSON, ${error}`);
  }
};

const toLowerCaseString = (data) => {
  try {
    const result = [];
    for (const category of data) {
      if (typeof category === 'string') {
        const lowerCase = category.toLowerCase();
        result.push(lowerCase);
      }
    }
    return result;
  } catch (error) {
    logger.error(`Error lower case data, err:${error}`);
  }
};

const removeCharacter = (inputString) => {
  return inputString
    .replace(/[ -./]+/g, '')
    .toUpperCase()
    .trim();
};

function validateFirstPartLicense(str) {
  const char1 = str[0];
  const char2 = str[1];
  const char3 = str[2];
  const characterset = /^[a-zA-Z]+$/;
  if (!characterset.test(char3)) {
    return '';
  }
  return char1 + char2 + char3.toUpperCase();
}

function validateSecondPartLicense(str) {
  const numericPattern = /^[+-]?\d+(\.\d+)?$/;
  if (!numericPattern.test(str)) {
    return '';
  }
  if (str.length === 4) {
    return str;
  }
  if (str.length === 5) {
    str = `${str.slice(0, 3)}.${str.slice(3)}`;
    return str;
  }
  return '';
}

function parseLicensePlate(licensePlate) {
  const firstPart = licensePlate.substring(0, 3);
  const secondPart = licensePlate.substring(3);
  const resultFirstPart = validateFirstPartLicense(firstPart);
  const resultSecondPart = validateSecondPartLicense(secondPart);
  if (resultFirstPart.length > 0 && resultSecondPart.length > 0) {
    return `${resultFirstPart}-${resultSecondPart}`;
  }
  return licensePlate;
}

const pushDataArray = (arr, data) => arr.push(data);
module.exports = {
  getCurrentTime,
  pushDataArray,
  getCurrentTimeEpoch,
  JSONParser,
  JSONStringify,
  toLowerCaseString,
  removeCharacter,
  parseLicensePlate,
};

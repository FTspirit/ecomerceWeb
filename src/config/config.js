const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'staging').required(),
    PORT: Joi.number().default(3000),
    HOST_NAME: Joi.string().default('127.0.0.1'),
    LOG_LEVEL: Joi.string().required(),
    LOG_LOCATION: Joi.string().required(),
    OTP_EXPIRATION_SECONDS: Joi.number().required().description('OTP code expiration time'),
    OTP_SESSION_SECONDS: Joi.number().required().description('OTP session time'),
    DEV_ID: Joi.number().required(),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_KEY_ID: Joi.string().required().description('JWT key ID for kong'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description('minutes after which access tokens expire')
      .required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire').required(),
    RATE_LIMIT_WINDOW_TIME_SECOND_DEFAULT: Joi.number().required().description('Rate limit window time 1s (default)'),
    RATE_LIMIT_MAX_DEFAULT: Joi.number().required().description('Rate limit '),
    RATE_LIMIT_WINDOW_TIME_SECOND_PUBLIC_API: Joi.number().required().description('Rate limit window time 60s (default)'),
    RATE_LIMIT_MAX_PUBLIC_API: Joi.number().required().description('Rate limit for restrict API'),
    PENALTY_INFO_URI: Joi.string().required().description('Penalty info API url'),
    ESMS_API_KEY: Joi.string().required(),
    ESMS_SECRET_KEY: Joi.string().required(),
    ESMS_BRANDNAME: Joi.string().required(),
    ESMS_BASE_URL_API: Joi.string().required(),
    PG_HOST_USER: Joi.string().required(),
    PG_PORT_USER: Joi.number().required(),
    PG_USER_NAME_USER: Joi.string().required(),
    PG_PASSWORD_USER: Joi.string().required(),
    PG_DB_USER: Joi.string().required(),
    PG_DIALECT_USER: Joi.string().required(),
    PG_LOGGING_USER: Joi.string(),
    ZALO_SECRET_KEY: Joi.string().required(),
    ZALO_APP_ID: Joi.string().required(),
    ZALO_GRANT_TYPE: Joi.string().required(),
    ZALO_OTP_TEMPLATE_ID: Joi.number().required(),
    ZALO_ZNS_TEMPLATE_ID: Joi.number().required(),
    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.string().required(),
    SMTP_USERNAME: Joi.string().required(),
    SMTP_PASSWORD: Joi.string().required(),
    SMTP_FROM_EMAIL: Joi.string().required(),
    SMTP_REPLY_EMAIL: Joi.string().required(),
    SMS_TYPE: Joi.number().required().description('SMS send type'),
    ZNS_TYPE: Joi.number().required().description('ZNS send type'),
    ONESIGNAL_URI: Joi.string().required().description('Onesignal API url'),
    ONESIGNAL_APP_ID: Joi.string().required().description('Onesignal App ID'),
    ONESIGNAL_REST_API_KEY: Joi.string().required().description('Onesignal rest api key'),
    LOCATION_UPLOAD_USER_GENERATED: Joi.string().required().description('Location for store user generate data'),
    GOFA_NAVIGATION_SERVICE: Joi.string().required().description('GoFa navigation service'),
    GOFA_DATAPOINT_SERVICE: Joi.string().required().description('GoFa datapoint service'),
    MINIO_ENDPOINT: Joi.string().required(),
    MINIO_PORT: Joi.number().required(),
    MINIO_ACCESS_KEY: Joi.string().required(),
    MINIO_SECRET_KEY: Joi.string().required(),
    MINIO_UPLOAD_BUCKET_URL: Joi.string().required(),
    MINIO_UPLOAD_BUCKET_NAME: Joi.string().required(),
    MINIO_SSL_USE: Joi.boolean().required(),
    MINIO_REGION: Joi.string().required(),
    MINIO_UPLOAD_USER_GENERATED_FOLDER: Joi.string().required(),
    PROFILE_APP: Joi.string().required(),
    GOONG_URL: Joi.string().required().description('Goong API url'),
    GOONG_AUTO_COMPLETE_TYPE: Joi.number().required().description('Goong auto complete type'),
    GOONG_DETAIL_TYPE: Joi.number().required().description('Goong detail type'),
    DEMO_NUMBER: Joi.string().required().description('Demo phone_number'),
    BRAVIGO_NUMBER: Joi.string().required().description('Bravigo phone_number'),
    ZALO_NUMBERS: Joi.string().required().description('Zalo phone_number'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({
    errors: {
      label: 'key',
    },
  })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  host: envVars.HOST_NAME,
  log: {
    level: envVars.LOG_LEVEL,
    location: envVars.LOG_LOCATION,
    dev_id: envVars.DEV_ID,
  },
  otp: {
    otpExpirationSecond: envVars.OTP_EXPIRATION_SECONDS,
    otpSessionExpiration: envVars.OTP_SESSION_SECONDS,
    smsType: envVars.SMS_TYPE,
    znsType: envVars.ZNS_TYPE,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    keyID: envVars.JWT_KEY_ID,
  },
  oneSignal: {
    url: envVars.ONESIGNAL_URI,
    appId: envVars.ONESIGNAL_APP_ID,
    apiKey: envVars.ONESIGNAL_REST_API_KEY,
  },
  rateLimiter: {
    windowTimeSecondDefault: envVars.RATE_LIMIT_WINDOW_TIME_SECOND_DEFAULT,
    maxDefault: envVars.RATE_LIMIT_MAX_DEFAULT,
    windowTimeSecondPublicDefault: envVars.RATE_LIMIT_WINDOW_TIME_SECOND_PUBLIC_API,
    maxPublicApi: envVars.RATE_LIMIT_MAX_PUBLIC_API,
  },
  esms: {
    apiKey: envVars.ESMS_API_KEY,
    secretKey: envVars.ESMS_SECRET_KEY,
    brandName: envVars.ESMS_BRANDNAME,
    url: envVars.ESMS_BASE_URL_API,
  },
  location: {
    uploadUserGenerated: envVars.LOCATION_UPLOAD_USER_GENERATED,
    uploadAiData: envVars.LOCATION_UPLOAD_AI_DATA,
    uploadFilesGpx: envVars.LOCATION_FILES_GPX,
  },
  navigationMode: {
    freeStyle: envVars.FREE_STYLES_MODE,
  },
  gofaService: {
    navigation: envVars.GOFA_NAVIGATION_SERVICE,
    datapoint: envVars.GOFA_DATAPOINT_SERVICE,
  },
  db: {
    postgresUSER: {
      host: envVars.PG_HOST_USER,
      port: envVars.PG_PORT_USER,
      userName: envVars.PG_USER_NAME_USER,
      password: envVars.PG_PASSWORD_USER,
      db: envVars.PG_DB_USER,
      dialect: envVars.PG_DIALECT_USER,
      logging: envVars.PG_LOGGING_USER,
    },
  },
  zalo: {
    secretKey: envVars.ZALO_SECRET_KEY,
    appId: envVars.ZALO_APP_ID,
    grantType: envVars.ZALO_GRANT_TYPE,
    templateId: envVars.ZALO_OTP_TEMPLATE_ID,
    znsTemplateId: envVars.ZALO_ZNS_TEMPLATE_ID,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
    reply: envVars.SMTP_REPLY_EMAIL,
  },
  minio: {
    endpoint: envVars.MINIO_ENDPOINT,
    port: envVars.MINIO_PORT,
    access_key: envVars.MINIO_ACCESS_KEY,
    secret_key: envVars.MINIO_SECRET_KEY,
    bucket_name: envVars.MINIO_UPLOAD_BUCKET_NAME,
    bucket_url: envVars.MINIO_UPLOAD_BUCKET_URL,
    ssl_use: envVars.MINIO_SSL_USE,
    UGC_foler: envVars.MINIO_UPLOAD_USER_GENERATED_FOLDER,
    region: envVars.MINIO_REGION,
  },
  user: {
    profileApp: envVars.PROFILE_APP,
  },
  utilsUrl: {
    penalty: envVars.PENALTY_INFO_URI,
  },
  goong: {
    type: {
      autoComplete: envVars.GOONG_AUTO_COMPLETE_TYPE,
      detail: envVars.GOONG_DETAIL_TYPE,
    },
    url: envVars.GOONG_URL,
  },
  phoneNumber: {
    demo: envVars.DEMO_NUMBER,
    bravigo: envVars.BRAVIGO_NUMBER,
    zalo: envVars.ZALO_NUMBERS.split(','),
  },
};

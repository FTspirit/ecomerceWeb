const express = require('express');

const router = express.Router();
const config = require('../../config/config');
const { authController } = require('../../controllers');
const ApiLimiter = require('../../middlewares/apiLimiter');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const { authV2 } = require('../../middlewares/auth');

// Login with password
router.post('/login-with-password', validate(authValidation.loginWithPassword), authController.loginController);

// Register
router.post('/register', authController.resgisterController);

// Logout
router.post('/logout', authV2(), validate(authValidation.logout), authController.logoutController);

// Send OTP to the phone number when the password is forgotten.
router.post(
  '/forgot-password',
  ApiLimiter(config.rateLimiter.windowTimeSecondPublicDefault, config.rateLimiter.maxPublicApi),
  validate(authValidation.forgotPassword),
  authController.forgotPasswordController
);

// Refresh token using authV2
router.post('/refresh-token-new', validate(authValidation.refreshTokenNew), authController.refreshTokenNewController);

// Update password
router.post('/update-password', authV2(), validate(authValidation.updatePassword), authController.updatePasswordController);

module.exports = router;

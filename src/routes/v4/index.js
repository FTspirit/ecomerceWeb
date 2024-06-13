/* eslint-disable no-tabs */
const express = require('express');
const authRoute = require('./auth.route');
const productRoute = require('./product.route');
const zaloRoute = require('./zalo.route');
const payosRoute = require('./payOs.route');
const categoryRoute = require('./category.route');
const momoRoute = require('./momo.route');
const vnpayRoute = require('./vnpay.route');
const pdfRoute = require('./pdf.route');
const orderRoute = require('./order.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/zalo',
    route: zaloRoute,
  },
  {
    path: '/payos',
    route: payosRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/momo',
    route: momoRoute,
  },
  {
    path: '/vnpay',
    route: vnpayRoute,
  },
  {
    path: '/pdf',
    route: pdfRoute,
  },
  {
    path: '/order',
    route: orderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;

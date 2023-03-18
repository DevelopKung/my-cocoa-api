// const authJwt = require("../middleware");
const express = require('express')
var router = express.Router();

/** Router */
const auth = require('./auth.router');
router.use('/auth', auth);

const bills = require('./bill.router');
router.use('/bill', bills);

const products = require('./products.router');
router.use('/product', products);

const topping = require('./topping.router');
router.use('/topping', topping);

const expenses = require('./expenses.router');
router.use('/expenses', expenses);

const revenue = require('./revenue.router');
router.use('/revenue', revenue);

const serviceCal = require('./service-cal');
router.use('/service', serviceCal);

const service = require('./service-test.router');
router.use('/service-test', service);

module.exports = router
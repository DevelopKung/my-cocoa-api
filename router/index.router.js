// const authJwt = require("../middleware");
const express = require('express')
var router = express.Router();

/** Router */
const auth = require('./auth.router');
router.use('/auth', auth);

// const bills = require('./bill.router');
// router.use('/bill', bills);

// const products = require('./products.router');
// router.use('/product', products);

// const topping = require('./topping.router');
// router.use('/topping', topping);

module.exports = router
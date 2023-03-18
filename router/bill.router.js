const express = require('express')
const bill = require('../controller/bill.controller');
const expen = require('../controller/expenses.controller');

var router = express.Router();

router.get('/', bill.findAll );
router.get('/option/', bill.findAllOption );
module.exports = router;
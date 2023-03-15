const express = require('express')
const bill = require('../controller/bill.controller');
var router = express.Router();

router.get('/', bill.findAll );
router.get('/option/', bill.findAllOption );
module.exports = router;
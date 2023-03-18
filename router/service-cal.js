const express = require('express')
const rev = require('../controller/revenue.controller');
const expen = require('../controller/expenses.controller');

var router = express.Router();

router.get('/cal-revenue/', rev.Calculate );
router.get('/cal-expenses/', expen.Calculate );
module.exports = router;
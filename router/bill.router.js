const express = require('express')
const bill = require('../controller/bill.controller');
var router = express.Router();

router.get('/', bill.findAll );
router.get('/:id', bill.findOne );
router.post('/', bill.create );
router.put('/:id', bill.update );
router.delete('/:id', bill.delete );

module.exports = router;
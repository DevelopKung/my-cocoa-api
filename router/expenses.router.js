const express = require('express')
const expen = require('../controller/expenses.controller');
var router = express.Router();

router.get('/', expen.findAll );
router.get('/:id', expen.findOne );
router.post('/', expen.create );
router.put('/:id', expen.update );
router.delete('/:id', expen.delete );

module.exports = router;
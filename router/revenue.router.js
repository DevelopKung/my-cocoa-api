const express = require('express')
const revenue = require('../controller/revenue.controller');
var router = express.Router();

router.get('/', revenue.findAll );
router.get('/:id', revenue.findOne );
router.post('/', revenue.create );
router.put('/:id', revenue.update );
router.delete('/:id', revenue.delete );

module.exports = router;
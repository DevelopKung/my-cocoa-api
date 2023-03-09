const express = require('express')
const items = require('../controller/products.controller');
var router = express.Router();

router.get('/', items.findAll );
router.get('/:id', items.findOne );
router.post('/', items.create );
router.put('/:id', items.update );
router.delete('/:id', items.delete );

module.exports = router;
const express = require('express')
const topping = require('../controller/topping.controller');
var router = express.Router();

router.get('/', topping.findAll );
router.get('/:id', topping.findOne );
router.post('/', topping.create );
router.put('/:id', topping.update );
router.delete('/:id', topping.delete );

module.exports = router;
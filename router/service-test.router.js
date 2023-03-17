const express = require('express')
var service = require('../controller/service.controller');
const multer = require('multer')
const upload = multer()
var router = express.Router();

router.post('/', upload.single('image'), service.create);

module.exports = router;
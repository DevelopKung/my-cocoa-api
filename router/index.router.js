// const authJwt = require("../middleware");
const express = require('express')
var router = express.Router();

/** Router */
const auth = require('./auth.router');
router.use('/auth', auth);

module.exports = router
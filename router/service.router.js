const express = require('express')
var pet = require('../controller/pets.controller');
const multer = require('multer')
const upload = multer()
var router = express.Router();

router.get('/:mem_id', pet.findAll);
router.get('/:mem_id/:id', pet.findOne);
router.post('/', upload.single('profile'), pet.create);
router.put('/', upload.single('profile'), pet.update);
// router.delete('/:id', pet.delete);

module.exports = router;
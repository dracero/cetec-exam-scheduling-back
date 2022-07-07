var express = require('express');
var router = express.Router();
const multer = require('multer');

var {
  add_exam
} = require('../controllers/scheduling_controller.js');

router.post('/exam', multer().none(), add_exam);

module.exports = router;

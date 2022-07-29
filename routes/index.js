var express = require('express');
var router = express.Router();
var passport =  require('passport');
var multer = require('multer');

var {
  add_exam,
  logout
} = require('../controllers/scheduling_controller.js');

const checkAuthenticated = (req, res, next) => {

  if (res.locals.authenticated) {
    return next()
  }
  
  res.status(401).end();
}

router.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

router.get('/logout', logout);
router.post('/exam', multer().none(), checkAuthenticated, add_exam);

module.exports = router;

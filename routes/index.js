var express = require('express');
var passport =  require('passport');
var router = express.Router();

var {
  get_exam_by_course_and_date,
  add_exam,
  put_exam,
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
router.get('/exam', checkAuthenticated, get_exam_by_course_and_date);
router.post('/exam', checkAuthenticated, add_exam);
router.put('/exam/:id', passport.authenticate('jwt', {session: false}), put_exam);

module.exports = router;

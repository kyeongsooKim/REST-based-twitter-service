var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Twitter Clone index' });
});
*/
router.get('/', (req, res, next) => {
  if (req.cookies.username) {
    res.render('main/home', { title: 'timeline', currentUser: req.cookies.username });
  } else {
    res.render('main/landing');
  }


});

module.exports = router;

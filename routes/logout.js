var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.clearCookie('username');
  res.render('main/landing', { title: 'logout' });
});

router.post('/', function(req, res, next) {
  res.clearCookie('username');
  res.status(200).json({
    status: 'OK'
  });
});

module.exports = router;
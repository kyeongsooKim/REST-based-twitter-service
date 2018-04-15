var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('accounts/login', { message: req.flash('loginMessage')});
});

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  console.log("Finding username: " + username + " password: " + password);
  User.findOne({ username: username }, function (err, user) {
    //can't find a user by username
    if (err || !user) {
      req.flash('loginMessage', 'No user found');
      res.status(200).json({
        status: 'error',
        error: 'Cannot find username'
      });
    } else {
      
      
      if (!user.verified)
      {
        req.flash('loginMessage', 'Please verify your account first');
        res.status(200).json({
          status: 'error',
          error: 'unverified'
        });
      }
      else if (user.password != password)
      {
        req.flash('loginMessage', 'Oops! wrong Password');
        res.status(200).json({
          status: 'error',
          error: 'wrong password'
        });
      }
      else if (user.password == password && user.verified) {
        res.cookie('username', username);
        res.status(200).json({
          status: 'OK'
        });
      }

    }
  });
});

module.exports = router;
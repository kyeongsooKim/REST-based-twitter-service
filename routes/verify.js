var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get((req, res, next) => {
    res.render('accounts/verify', { message: req.flash('errors') });
  });

router.post('/', function (req, res, next) {
	var email = req.body.email;
	var key = req.body.key;

	console.log("Finding email: " + email + " key: " + key);
	User.findOne({ email: email }, function (err, user) {
		//can't find a user by email
		if (err || !user) {
			console.log("Can't find email");
			res.status(200).json({
				status: 'error',
				error: "Email & key no match"
			});
		} else {
			if (user.email == email && user.key == key) {
				//activate user
				user.set({
					verified: true
				});

				//update user on database
				user.save(function (err, updateduser) {
					if (err) return handleError(err);
					//return OK status response
					console.log("Verified!");
					res.status(200).json({
						status: 'OK'
					});
				});

			} else {
				//the key is wrong
				console.log("Email & key no match");
				res.status(200).json({
					status: 'error',
					error: "Email & key no match"
				});
			}
		}
	});
});

module.exports = router;
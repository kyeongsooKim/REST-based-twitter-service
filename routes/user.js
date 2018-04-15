const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Gets user profile information
router.get('/:username', function (req, res, next) {
    var username = req.params.username;
    User.findOne({ username: username }, function (err, user) {
        //can't find a user by userid
        if (err || !user) {
            console.log("Can't find username");
            res.status(200).json({
                status: 'error'
            });
        }
        else {
            var followersNum = user.followers.length;
            var followingNum = user.following.length;
            res.status(200).json({
                status: 'OK',
                user: {
                    email: user.email,
                    followers: followersNum,
                    following: followingNum
                }
            });
        }
    });
});


//Gets list of users following “username”
router.get('/:username/followers', function (req, res, next) {

    var username = req.params.username;
    var limit = 50; //default : 50

    if (typeof (req.query.limit) !== 'undefined') {
        if (req.query.limit > 200)
            limit = 200;
        else
            limit = req.query.limit;
    }

    User.findOne({ username: username }, function (err, user) {
        //can't find a user by username
        if (err || !user) {
            console.log("Can't find username");
            res.status(200).json(
                "error"
            )
        }
        else {
            var followers = user.followers; //array containging followers name
            if (followers.length > limit)
                followers = followers.slice(0, limit);

            res.status(200).json({
                status: 'OK',
                users: followers
            });

        }
    });


});

//Gets list of users “username” is following
router.get('/:username/following', function (req, res, next) {
    var username = req.params.username;
    var limit = 50; //default : 50

    if (typeof (req.query.limit) !== 'undefined') {
        if (req.query.limit > 200)
            limit = 200;
        else
            limit = req.query.limit;
    }

    User.findOne({ username: username }, function (err, user) {
        //can't find a user by username
        if (err || !user) {
            console.log("Can't find username");
            res.status(200).json(
                "error"
            )
        }
        else {
            var following = user.following; //array containing followers' name;
            if (following.length > limit)
                following = following.slice(0, limit);


            res.status(200).json({
                status: 'OK',
                users: following
            });

        }
    });


});

module.exports = router;

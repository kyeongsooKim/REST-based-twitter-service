const express = require('express');
const async = require('async');
const router = express.Router();
const User = require('../models/User');


//follow endpoint
router.post('/', (req, res, next) => {
    var currentUsername = req.cookies.username; //my id
    var targetUsername;
    var follow = true; //default : true
    if (typeof (req.body.follow) !== 'undefined')
        follow = req.body.follow;

    User.findOne({ username: req.body.username }, function (err, user) {
        //can't find a user by username
        if (err || !user) {
            console.log("Can't find username");
            res.status(200).json({
                status: 'error'
            });
        }
        else {
            targetUsername = user.username;

            if (follow) //follow
            {
                async.parallel([
                    function (callback) {
                        User.update( //update targetId
                            {
                                username: targetUsername,
                                //followers: { $ne: currentUsername }
                            },
                            {
                                $push: { followers: currentUsername }
                            }, function (err, count) {
                                callback(err, count);
                            }
                        )
                    },

                    function (callback) { //update currentUser
                        User.update(
                            {
                                username: currentUsername,
                                following: { $ne: targetUsername }
                            },
                            {
                                $push: { following: targetUsername }
                            }, function (err, count) {
                                callback(err, count);
                            }
                        )
                    }
                ], function (err, results) {
                    if (err) {
                        res.status(200).json({
                            status: 'error'
                        });
                    }
                    res.status(200).json({
                        status: 'OK'
                    });
                });
            }
            else //unfollow
            {
                async.parallel([
                    function (callback) {
                        User.update(
                            {
                                username: targetUsername,
                            },
                            {
                                $pull: { followers: currentUsername }
                            }, function (err, count) {
                                callback(err, count);
                            }
                        )
                    },

                    function (callback) {
                        User.update(
                            {
                                username: currentUsername,
                            },
                            {
                                $pull: { following: targetUsername }
                            }, function (err, count) {
                                callback(err, count);
                            }
                        )
                    }
                ], function (err, results) {
                    if (err) {
                        res.status(200).json({
                            status: 'error'
                        });
                    }
                    res.status(200).json({
                        status: 'OK'
                    });
                });
            }

        }

    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require('../models/User');
const nodemailer = require('nodemailer');

/* GET adduser listing. */
router.get('/', function (req, res, next) {
    res.render('accounts/adduser', { message: req.flash('errors') });
});

router.post('/', function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var key = makeKey();

    var newUser = new User({
        username: username,
        password: password,
        email: email,
        key: key,
        verified: false
    });

    newUser.save(function (err, newUser) {
        if (err) return console.error(err);
        else console.log("User Saved!");
    });

    sendMail(email, key);

    res.status(200).json({
        status: 'OK'
    });
});

function makeKey() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function sendMail(email, key) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "cse356twitterclone2@gmail.com", // generated ethereal user
                pass: "2Q2-Fg3-4D9-WAt" // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Twitter Clone" <cse356twitterclone2@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Verify your account', // Subject line
            text: "validation key: <" + key + ">" // plain text body
            //html: '<p>Key: ' + key + '\n</p> <p><a href="http://localhost:/verify">verify</a></p>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}

function isUnique(username, email) {
    User.findOne({ username: username }, function (err, user) {

        if (err) {
            User.findOne({ email: email }, function (err, user) {
                if (err) {return true;}
                else return false;
            });
        }
        else {return false;}
    });
}

module.exports = router;

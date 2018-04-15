var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/twitter';
mongoose.connect(mongoDB);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connected to Mongoose!");
});



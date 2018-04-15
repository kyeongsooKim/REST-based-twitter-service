var mongoose = require('mongoose');  
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({  
  username: String,
  email: String,
  password: String,
  key: String,
  verified: false,
  following: [ String ],
  followers: [ String ]
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
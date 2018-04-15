var mongoose = require('mongoose');  
var ItemSchema = new mongoose.Schema({  
  id: String,
  username: String,
  property: {
    likes: Number
  },
  retweeted: Number,
  content: String,
  timestamp: Number
});
mongoose.model('Item', ItemSchema);

module.exports = mongoose.model('Item');
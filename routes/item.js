var express = require('express');
var router = express.Router();
var Item = require('../models/Item');

/* GET */
router.get('/:id', function (req, res, next) {
  Item.findOne({ id: req.params.id }, function (err, item) {
    //can't find a item by username
    if (err || !item) {
      console.log("Can't find item");
      res.status(200).json({
        status: 'error',
        error: 'Cannot find item'
      });
    } else {
      console.log("Found: " + item.id);
      res.status(200).json({
        status: 'OK',
        item: {
          id: item.id,
          username: item.user,
          property: { likes: 0 },
          retweeted: 0,
          content: item.content,
          timestamp: Math.floor(Date.now() / 1000)
        }
      });
    }
  });
});

/* DELETE */
router.delete('/:id', function (req, res, next) {
  console.log("DELETE");
  var targetId = req.params.id;
  Item.find({ id: targetId }).remove(function (err, item) {
    if (err || !item) {
      console.log("Can't find item");
      res.status(204).end();
    } else {
      res.status(200).json({
        status: 'OK'
      });
    }
  });
});

module.exports = router;
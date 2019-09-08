var express = require('express');
var friends = require('../data/friends');

var router = express.Router();

router.get('/friends', function(req, res) {
  return res.json(friends);
})

router.post('/friends', function(req, res) {
  var data = req.body;


})

module.exports = router;
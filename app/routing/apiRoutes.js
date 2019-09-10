var express = require('express');
var friends = require('../data/friends');

var router = express.Router();

//Get request
router.get('/friends', function(req, res) {
  return res.json(friends);
})

//Post request
router.post('/friends', function(req, res) {

  //Getting information from request
  var data = req.body;

  //Assigning dummy photo
  var photoArr = ["http://placekitten.com/g/200/300", "https://dog.ceo/api/breeds/image/random"];

  var photo = photoArr[Math.floor(Math.random(photoArr) * 2)];

  //Updating answer to only number (removing string content if exists)
  for(var i=0; i<data.answers.length; i++) {
    if(data.answers[i].length > 0) {
      data.answers[i] = data.answers[i].charAt(0);
    }
  }

  //Filtered answer
  var friend = {
    name: data.firstName + " " + data.lastName,
    photo: photo,
    scores: data.answers
  }

  console.log("friend", friend);
})

module.exports = router;
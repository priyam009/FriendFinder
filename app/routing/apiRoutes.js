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

  getfriend(friend.scores);
});


function getfriend(user) {

  //Store totalDifference values
  var finder = [];
  
  for(var i=0; i<friends.length; i++) {
    var totalDifference = 0;
    var other = friends[i].scores;

    //Change Friends API scores to Integer
    other = other.map(function(each) {
      return parseInt(each);
    })

    //Change user score to Integer
    user = user.map(function(each) {
      return parseInt(each)
    })

    //Loop to calculate difference between 2 values at each index
    for(var j=0; j<other.length; j++) {

      //Difference between 2 values in an array
      totalDifference += Math.abs(user[j] - other[j]);

    }
    //Add difference to finder list
    finder.push(totalDifference);

  }

  var value = finder[0];
  var index = 0;

  for(var i=0; i<finder.length; i++) {
    if (finder[i] < value) {
      value = finder[i];
      index = i;
    }
  }

  console.log("finder", finder);
  console.log("new friend", friends[index].name);
}

module.exports = router;
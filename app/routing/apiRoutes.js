var express = require('express');
var friends = require('../data/friends');
var fs = require('fs');

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
  var photoArr = ["http://placekitten.com/g/200/300", "https://loremflickr.com/320/240/dog"];

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

  // console.log("friend", friend);

  //Get best matching friend
  var chosen = getFriend(friend.scores);

  //Return response JSON
  res.json(chosen);
});


function getFriend(user) {

  //Store totalDifference values
  var finder = [];
  
  //Loop through each potential friend
  for(var i=0; i<friends.length; i++) {
    var totalDifference = 0;
    var other = friends[i].scores;

    //Change the values from string to integer
    other = getInteger(other);
    user = getInteger(user);

    //Loop to calculate difference between 2 values at each index
    for(var j=0; j<other.length; j++) { 
      //Difference between 2 values in an array
      totalDifference += Math.abs(user[j] - other[j]);
    }

    //Push the difference for each potential friend in array finder
    finder.push(totalDifference);
  }

  //Get index of the matching friend
  var index = friendFinder(finder);

  //Return object for the matching friend
  return friends[index];
}

//Update string values to integer value
function getInteger(change) {
  change = change.map(function(each) {
    return parseInt(each);
  });
  return change;
};

//Function to get matching friend
function friendFinder(finder) {
  var value = finder[0];
  var index = 0;

  for(var i=0; i<finder.length; i++) {
    if (finder[i] < value) {
      value = finder[i];
      index = i;
    }
  }

  return index;
}

module.exports = router;
var path = require('path');
var express = require('express');
var router = express.Router();

//Survey Page
router.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
});

//Home page
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});


module.exports = router;

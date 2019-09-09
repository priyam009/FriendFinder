var express = require('express');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var html = require("./app/routing/htmlRoutes");
var api = require("./app/routing/apiRoutes");

app.use(express.static(path.join(__dirname,'/app')));

app.use('/api', api);
app.use('', html);


app.listen(PORT, function() {
  console.log("The app is listening on " + PORT);
})

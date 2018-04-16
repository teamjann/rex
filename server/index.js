var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// var db = require('../database');

var app = express();

app.use(express.static(__dirname + "/../client/dist"));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(3000, function() {
  console.log("listening on port 3000!");
});

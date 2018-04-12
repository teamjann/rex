var express = require('express');
var bodyParser = require('body-parser');

// var db = require('../database');


var app = express();

app.use(express.static(__dirname + '/../client/dist'));


app.get('/hello', function (req, res) {
  res.json('hey');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


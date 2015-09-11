var express = require('express');
var crypto = require('crypto');
var sha1 = require('sha1');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');
var mongoose = require("mongoose");

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// MongoDB configuration
mongoose.connect('mongodb://localhost/sso', function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

// Routes
app.get('/', function (req, res) {
  res.render('index.jade');
});

app.get('/token/generate/:payload', function (req, res) {
  // var hash = crypto.randomBytes(16).toString('hex');
  var hash = sha1(req.params.payload);
  res.send(hash);
});

app.get('/token/lookup/:token', function (req, res) {
  res.send(req.params.token);
});

app.get('/token/:token', function(req, res) {
  var token = req.body.token;
  res.send('hello');
});

// Person model
var Person = require('./models/person.js');

app.get('/person', function(req, res) {
  console.log("GET - /person");
  return Person.findById(req.params.id, function(err, person) {
    if(!err) {
      return res.send(person);
    } else {
      res.statusCode = 500;
      console.log('Internal error(%d): %s',res.statusCode,err.message);
      return res.send({ error: 'Server error' });
    }
  });
});

// Server
var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
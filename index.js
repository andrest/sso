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

// ID authenticate person, create hash and save person
app.get('/', function (req, res) {
  // Placeholders
  var authenticated = true;
  var idNumber = '3920505';

  if (authenticated) {
    // TODO: generate hash from ID card
    var hash = sha1(idNumber);
    // save the user in the DB
    var person = new Person({
      firstname: 'John',
      lastname: ' Smith',
      id: idNumber,
      hash: hash
    });
    person.save();
    // var hash = crypto.randomBytes(16).toString('hex');

  } else {
    // TODO: fail with error
  }
  res.render('index.jade', {token: hash});
});

// Get person by token
app.get('/token/:token', function (req, res) {
  var query = Person.findOne({ 'hash': req.params.token }, function(err, person) {
    if (person === null)
      res.send('invalid token');
    else
      res.send(person);
  });
});

// Server
var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
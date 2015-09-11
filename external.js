var express = require('express');
var crypto = require('crypto');
var sha1 = require('sha1');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');

var app = express();

app.set('view engine', 'jade');
app.set('views', './views')

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function (req, res) {
  res.render('index.jade');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('External app listening at http://%s:%s', host, port);
});
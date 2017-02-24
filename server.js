/* #cusku */

var express = require('express');
var parser  = require('body-parser');
var session = require('express-session');
var app     = express();
var server  = require('http').Server(app);
var path    = require('path');

function isValid(nick) {
  if (typeof nick !== 'string') {
    return false;
  }
  if (2 > nick.length || nick.length > 32) {
    return false;
  }
  return true;
}

app.use(session({ secret: 'd966a066-e29b-4996-b42a-c228ee393500' }));

app.use('/login', parser.urlencoded({ extended: true }));

app.post('/login', function(req, res) {
  var nick = req.body.nick || false;

  if (isValid(nick)) {
    req.session.nick = nick;
    res.status(303).location('/').end();
  }
});

app.get('/', function(req, res) {
  if (typeof req.session.nick !== 'undefined') {
    console.log('>', req.session.nick);
    res.sendFile(path.resolve(__dirname, 'index.html'));
  }
  else {
    res.status(303).location('/login').end();
  }
});

app.get('/login', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.use(express.static(__dirname));

server.listen(3006, function() {
  console.log('Server started on *:3000');
});

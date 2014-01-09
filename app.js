var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var mongoUri = process.env.MONGOHQ_URL || 'mongodb://localhost/keep-in-touch';
var port = process.env.PORT || 8080;
var configDB = require('./config/db.js');
//this isn't right


// Create server
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'there was an error when connecting to mongodb'));

// Configure server
// app.set('port', process.env.PORT || 3000);
// app.use(express.favicon());
// app.use(express.bodyParser());

// Mount statics
// app.use(express.static(path.join(__dirname, '/browser')));

app.configure(function(){
  app.use(express.static(__dirname + "/browser"));
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.bodyParser());
});


// Route index.html
app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, './browser/index.html'));
});

app.listen(port);
console.log('This ya boy EXPRESS.JS we listening on ' + port + '!');

//setup

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var database = require('./config/database');
var session = require('express-session')



mongoose.connect(database.url);

app.use(session({secret: "123456"}));
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//set routes
require(__dirname + '/app/routes/claims.js')(app);
require(__dirname + '/app/routes/login.js')(app);

//listen
app.listen(8080, (err,res) => {
	console.log("Listening to port 8080");
});


//setup

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var database = require('./config/database');

 mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
//set routes
require(__dirname + '/app/routes/router.js')(app);

// app.get('*', function(req, res) {
//     res.sendfile('./public/index.html');
// });

//listen
app.listen(8080, (err,res) => {
	console.log("Listening to port 8080");
});


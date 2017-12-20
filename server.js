//setup

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



mongoose.connect('mongodb://root:root@ds159856.mlab.com:59856/claims');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));

//set routes
require(__dirname + '/app/routes/router.js')(app);

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

//listen
app.listen(8080, (err,res) => {
	console.log("Listening to port 8080");
});


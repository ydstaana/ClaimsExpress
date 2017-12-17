var mongoose = require('mongoose'),
	express = require('express'),
	router = express.Router()

var objSchema = new mongoose.Schema({
	name : String,
	liscense: String
});

mongoose.model('Object', objSchema);
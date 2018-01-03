var mongoose = require('mongoose')

var LogSchema = new mongoose.Schema({
	userId : String,
	userName : String,
	message : String,
	date : String
});

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;
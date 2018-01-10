var mongoose = require('mongoose')

var LogSchema = new mongoose.Schema({
	user: {
		type : mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	organization: {
		type : mongoose.Schema.Types.ObjectId,
		ref: 'Organization'
	},
	message : String,
	date : String
});

var Log = mongoose.model('Log', LogSchema);

module.exports = Log;
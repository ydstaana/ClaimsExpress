var mongoose = require('mongoose')

var OrgSchema = new mongoose.Schema({
	name: String,
	users : [{
		type : mongoose.Schema.Types.ObjectId,
		ref: 'User'}]
});

var Organization = mongoose.model('Organization', OrgSchema);

module.exports = Organization;
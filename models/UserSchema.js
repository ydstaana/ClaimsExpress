var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
	userType: String,
	username : String,
	password: String,
	organization: {
		type : mongoose.Schema.Types.ObjectId,
		ref: 'Organization'
	}
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
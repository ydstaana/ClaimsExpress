var mongoose = require('mongoose')

var objSchema = new mongoose.Schema({
	name : String,
	license: String
});

var Claim = mongoose.model('Claim', objSchema);

module.exports = Claim;
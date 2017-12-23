var mongoose = require('mongoose')

var ClaimSchema = new mongoose.Schema({
	name : String,
	license: String
});

var Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
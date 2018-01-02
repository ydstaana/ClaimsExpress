var mongoose = require('mongoose')

var ClaimSchema = new mongoose.Schema({
	name : String,
	license: String
	/*date : Date,
	model : String,
	loss: Boolean*/
});

var Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
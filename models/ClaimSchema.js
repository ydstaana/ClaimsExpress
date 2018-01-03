var mongoose = require('mongoose')

var ClaimSchema = new mongoose.Schema({
	policyID: Number,
	insurer : {
		lastName: String,
		firstName: String,
		middleName: String,
	},
	address: String,
	vehicle: {
		year: String,
		make: String,
		model: String,
		motorNo: Number,
		serialNo: Number,
		orNo: Number,
	},
	dateOfLoss: String,
	situationOfLoss: String,
	natureOfLoss: String,
	settlement: {
		dateOfSettlement: String,
		amount: Number,
	}
	/*date : Date,
	model : String,
	loss: Boolean*/
});

ClaimSchema.on('init', function (model) {
  // do stuff with the model
  claimDate = new Date();
  model.claimDate = claimDate;
});

var Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
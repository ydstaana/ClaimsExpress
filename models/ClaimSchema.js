var mongoose = require('mongoose')

var ClaimSchema = new mongoose.Schema({
	policyID: Number,
	address: String,
	dateOfLoss: String,
	situationOfLoss: String,
	natureOfLoss: String,
	claimDate:  { type: Date, default: Date.now },
	lastName: String,
    firstName: String,
	middleName: String,
	dateOfSettlement: Date,
	amount: Number,
	year: Date,
    make: String,
    model: String,
    motorNo: Number,
    serialNo: Number,
    orNo: Number
	/*date : Date,
	model : String,
	loss: Boolean*/
});

// ClaimSchema.on('init', function (model) {
//   // do stuff with the model
//   claimDate = new Date();
//   model.claimDate = claimDate;
// });

var Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
var mongoose = require('mongoose')

var ClaimSchema = new mongoose.Schema({
	policyID: Number,
	lastName: String,
    firstName: String,
	middleName: String,
	address: String,
    make: String,
    model: String,
    motorNo: String,
    serialNo: String,
	dateOfLoss: { type: Date, default: Date.now },
	situationOfLoss: String,
	natureOfLoss: String,
	dateOfSettlement: { type: Date, default: Date.now },
	claimDate:  { type: Date, default: Date.now },
	amount: Number,
	year: String,
	orNo: String,
    insurer: {
		type : mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}

});

var Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
var mongoose = require('mongoose')

var ClaimSchema = new mongoose.Schema({
	claimDate:  { type: Date, default: Date.now },
	lastName: String,
    firstName: String,
	middleName: String,
	dateOfSettlement: Date,
	amount: Number,
	year: Date,
    make: String,
    model: String,
    motorNo: String,
    serialNo: String,
    orNo: String,
    insurer: {
		type : mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}

});

var Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
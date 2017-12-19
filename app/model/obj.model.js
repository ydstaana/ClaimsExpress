const mongoose = require('mongoose')


const ClaimSchema = new mongoose.Schema({
	name : String,
	email: String,
	number: Number
},

{
	collection: "Claims"
});

// mongoose.model('Object', objSchema);

module.exports = mongoose.model('Claim', ClaimSchema);
var mongoose = require('mongoose')

var objSchema = new mongoose.Schema({
	_id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
    required: true,
    auto: true,
  },
	name : String,
	license: String
});

var Claim = mongoose.model('Claim', objSchema);

module.exports = Claim;
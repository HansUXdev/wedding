var mongoose = require('mongoose');

// User Schema
var BrideFamilySchema = mongoose.Schema({
	name: {
		type: String
	},
	relationship: {
		type: String
	},
	image: {
		type: String
	},
	description: {
		type: String
	},
	/// bride, Bride, partner
	// type: {
	// 	type: String
	// },
});

var BrideFamily = module.exports = mongoose.model('BrideFamily', BrideFamilySchema);




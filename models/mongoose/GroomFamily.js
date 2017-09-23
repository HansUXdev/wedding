var mongoose = require('mongoose');

// User Schema
var GroomFamilySchema = mongoose.Schema({
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
	/// bride, groom, partner
	// type: {
	// 	type: String
	// },
});

var GroomFamily = module.exports = mongoose.model('GroomFamily', GroomFamilySchema);




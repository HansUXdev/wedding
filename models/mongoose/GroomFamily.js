var mongoose = require('mongoose');

// User Schema
var GroomFamilySchema = mongoose.Schema({
	name: {
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

var Couple = module.exports = mongoose.model('Couple', CoupleSchema);




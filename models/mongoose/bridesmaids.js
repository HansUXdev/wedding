var mongoose = require('mongoose');

// User Schema
var bridesmaidSchema = mongoose.Schema({
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

var bridesmaid = module.exports = mongoose.model('bridesmaid', bridesmaidSchema);




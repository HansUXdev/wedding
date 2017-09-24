var mongoose = require('mongoose');

// User Schema
var groomsmenSchema = mongoose.Schema({
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

var groomsmen = module.exports = mongoose.model('groomsmen', groomsmenSchema);




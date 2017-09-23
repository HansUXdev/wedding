var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var CoupleSchema = mongoose.Schema({
	fullname: {
		type: String,
		index:true
	},
	photo: {
		type: String
	},
	/// bride, groom, partner
	type: {
		type: String
	},
});

var Couple = module.exports = mongoose.model('Couple', CoupleSchema);




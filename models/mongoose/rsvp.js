var mongoose = require('mongoose');

// User Schema
var RsvpSchema = mongoose.Schema({
	fullname: {
		type: String
	},
	address: {
		type: String
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
	numguest: {
		type: String
	},
  allevents: {
  	type: String
  },
	attending: {
		type: String
	}
});

var Rsvp = module.exports = mongoose.model('Rsvp', RsvpSchema);

module.exports.getRSVPByFullName = function(fullname, callback){
	var query = {fullname: fullname};
	Rsvp.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	Rsvp.findById(id, callback);
}

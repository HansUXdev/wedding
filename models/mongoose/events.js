var mongoose = require('mongoose');

// User Schema
var EventsSchema = mongoose.Schema({
	title: {
		type: String
	},
	// 4:30PM - 6:15PM
  time: {
  	type: String
  },
	// Saturday, 20 july 2015
	date: {
		type: String
	},
	// "/public/assets/img/event_icon1.png"
	// data uri?
  image: {
  	type: String
  },
	// Hotel Radisson
	location: {
		type: String
	},
	// 4th Street,DOHS MIRPUR
	address: {
		type: String
	},
});

var Events = module.exports = mongoose.model('Events', EventsSchema);


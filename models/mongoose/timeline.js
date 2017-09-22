var mongoose = require('mongoose');


// User Schema
var TimelineSchema = mongoose.Schema({
	title: {
		type: String
	},
	// 4:30PM - 6:15PM
  date: {
  	type: String
  },
	// "/public/assets/img/event_icon1.png"
	// data uri?
  image: {
  	type: String
  },
  logo: {
    type: String
  },
  description: {
  	type: String
  },
  // is it on the left side
  left: {
    type: String
  }
});

var Timeline = module.exports = mongoose.model('Timeline', TimelineSchema);


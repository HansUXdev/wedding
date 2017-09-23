let mongoose = require('mongoose');

// Gallery Schema
let slideshowSchema = mongoose.Schema({
  image:{
    type: String
  },
  title:{
    type: String
  },
  description:{
    type: String
  },
});

let Slideshow = module.exports = mongoose.model('Slideshow', slideshowSchema);

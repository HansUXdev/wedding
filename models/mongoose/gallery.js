let mongoose = require('mongoose');

// Gallery Schema
let gallerySchema = mongoose.Schema({
  primaryImage:{
    type: String
  },
  category:{
    type: String
  },
  description:{
    type: String
  },
  secondaryImage:{
    type: String
  },
});

let Gallery = module.exports = mongoose.model('Gallery', gallerySchema);

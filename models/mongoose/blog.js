let mongoose = require('mongoose');

// Blog Schema
let blogSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  categories:{
    type: String
  },
  image:{
    type: String
  },
  author:{
    type: String,
    // required: true
  },
  body:{
    type: String,
    // required: true
  }
});

let Blog = module.exports = mongoose.model('Blog', blogSchema);

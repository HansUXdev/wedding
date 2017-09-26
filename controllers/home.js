
module.exports = function(app, ensureAuthenticated) {
  var mongoose = require('mongoose');
  let Rsvp = require('../models/mongoose/rsvp');
  // let Timeline = require('../models/mongoose/timeline');
  // let Events = require('../models/mongoose/events');


  app.get('/', function(req, res) {
    // Chain multiple models
    // https://stackoverflow.com/questions/26402781/nodejs-mongoose-render-two-models-from-collections
      var Couple = mongoose.model('Couple');
      var GroomFamily = mongoose.model('GroomFamily');
      var BrideFamily = mongoose.model('BrideFamily');
      var Slideshow = mongoose.model('Slideshow');
      var Timeline = mongoose.model('Timeline');
      var Events = mongoose.model('Events');
      
      Couple.find(function (err, couple) {
        GroomFamily.find(function (err, groomFam) {
          BrideFamily.find(function (err, brideFam) {
            Slideshow.find(function (err, slides) {
              Timeline.find(function (err, timeline) {
                  Events.find(function (err, events) {
                      res.render('demo', {
                          layout: 'bootstrap',
                          slideshow : slides,
                          couple : couple,
                          groomFam: groomFam,
                          brideFam: brideFam,
                          // groomFam:,
                          timeline : timeline,
                          events : events
                      });
                  });
              });
            });
          });
        });
      });
  });

/// Post the RSVP 
  app.post("/",function(req, res) {
        var RSVP = new Rsvp();
        RSVP.fullname = req.body.name;
        RSVP.address = req.body.address;
        RSVP.phone = req.body.phone;
        RSVP.email = req.body.email;
        RSVP.numguest = req.body.numguest;
        RSVP.allevents = req.body.allevents;
        // RSVP.message = req.body.message;
        RSVP.attending = req.body.attending;

        RSVP.save(function(err){
          if (err) {console.log(err); return;} 
          else{res.redirect('/');};
        });
  });


};


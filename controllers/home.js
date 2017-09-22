
module.exports = function(app, menu) {
  var mongoose = require('mongoose');
  let Rsvp = require('../models/mongoose/rsvp');
  // let Timeline = require('../models/mongoose/timeline');
  // let Events = require('../models/mongoose/events');


  app.get('/', function(req, res) {
      var Timeline = mongoose.model('Timeline');
      var Events = mongoose.model('Events');

      Timeline.find(function (err, timeline) {
          Events.find(function (err, events) {
              res.render('demo', {
                  layout: 'bootstrap',
                  timeline : timeline,
                  events : events
              });
          });
      });
  });

  // app.get("/",function(req, res) {
  //     let query = Timeline.find({}).limit(5);
  //     query.exec(function (err, timeline, events) {
  //         if (err) {throw Error; }
  //         res.render('demo', {
  //           layout: 'bootstrap',
  //           timeline: timeline,
  //           events: events,
  //           // assets: '../../public/assets/'
  //         });
  //     });
  //     // res.render('demo', {
  //     //   layout: 'bootstrap',
  //     //   timeline: timeline,
  //     //   events: events,
  //     // });
  // });

/// Post the RSVP 
  app.post("/",function(req, res) {
        var RSVP = new Rsvp();
        RSVP.fullname = req.body.name;
        RSVP.email = req.body.email;
        RSVP.numguest = req.body.numguest;
        RSVP.allevents = req.body.allevents;
        RSVP.attending = req.body.attending;

        RSVP.save(function(err){
          if (err) {console.log(err); return;} 
          else{res.redirect('/');};
        });
  });


};


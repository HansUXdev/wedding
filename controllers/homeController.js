
module.exports = function(app) {
  const mongoose     = require('mongoose');
  const async        = require('async');
  const exphbs       = require("express-handlebars");
  const path         = require('path');
  const Rsvp         = require('../models/mongoose/rsvp');

  // Chain multiple models
  // https://stackoverflow.com/questions/26402781/nodejs-mongoose-render-two-models-from-collections
  app.get('/', function(req, res) {
    const Couple      = mongoose.model('Couple');
    const GroomFamily = mongoose.model('GroomFamily');
    const BrideFamily = mongoose.model('BrideFamily');
    const Slideshow   = mongoose.model('Slideshow');
    const Timeline    = mongoose.model('Timeline');
    const Events      = mongoose.model('Events');

    let SLIDES    = Slideshow.find({});
    let COUPLE    = Couple.find({});
    let GroomFam  = GroomFamily.find({});
    let BrideFam  = BrideFamily.find({});
    let TIMELINE  = Timeline.find({});
    let EVENTS    = Events.find({});

    let resources = {
        slideshow : SLIDES.exec.bind(SLIDES),
        couple : COUPLE.exec.bind(COUPLE),
        groomFam: GroomFam.exec.bind(GroomFam),
        brideFam: BrideFam.exec.bind(BrideFam),
        timeline : TIMELINE.exec.bind(TIMELINE),
        events : EVENTS.exec.bind(EVENTS)
    };

    async.parallel(resources, function (error, data){
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.render('demo', {layout: 'bootstrap', data});
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


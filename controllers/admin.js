

module.exports = function(app, ensureAuthenticated) {
  var passport        = require('passport');
  var LocalStrategy   = require('passport-local').Strategy;
  var flash           = require('connect-flash');
  var mongoose        = require('mongoose');
  /// User Model
  var User            =  mongoose.model('User');
  var Rsvp            =  require('../models/mongoose/rsvp');
  

  // Get Admin only when Authenticated
    app.get('/admin',ensureAuthenticated, function(req, res){
      // res.render('admin/admin',{layout:'dashboard'});
      var query = Rsvp.find({}).limit(10);
      query.exec(function (err, message) {
          if (err) {throw Error; }
          res.render('admin/admin', {
            layout: 'dashboard',
            messages: message,
            // assets: '../public/assets/'
          });
      });
    });

    // view the RSVP'S you get
    app.get('/admin/messages',ensureAuthenticated, function(req, res){
      var query = Rsvp.find({}).limit(10);
      query.exec(function (err, message) {
          if (err) {throw Error; }
          res.render('admin/messages', {
            layout: 'dashboard',
            messages: message,
            assets: '../../public/assets/'
          });
      });
    });

  /// Edit the Timeline
    const Timeline = require('../models/mongoose/timeline');
    app.get('/admin/timeline',ensureAuthenticated, function(req, res){
      var query = Timeline.find({}).limit(10);
      query.exec(function (err, timeline) {
          if (err) {throw Error; }
          res.render('admin/timeline', {
            layout:'dashboard',
            timeline: timeline,
            assets: '../../public/assets/'
          });
      });
    });
    app.post("/admin/timeline", ensureAuthenticated, function(req, res) {
        let TIMELINE = new Timeline();
            TIMELINE.title = req.body.title;
            TIMELINE.date = req.body.date;
            TIMELINE.image = req.body.image;
            TIMELINE.logo = req.body.logo;
            TIMELINE.description = req.body.description;
            TIMELINE.position = req.body.position;

        TIMELINE.save(function(err){
          if (err) {console.log(err); return;} 
          else{res.redirect('/');};
        });
    });

/// Edit Family

/// Edit Gallery
    app.get('/admin/gallery',ensureAuthenticated, function(req, res){
      // var query = User.find({}).limit(10);
      // query.exec(function (err, user) {
      //     if (err) {throw Error; }
          res.render('admin/couple', {
            layout:'dashboard',
            // users: user,
            assets: '../../public/assets/'
          });
      // });
    });

/// Edit Events
    const Events = require('../models/mongoose/events');
    app.post("/admin/events",function(req, res) {
        let EVENTS = new Events();
            EVENTS.title = req.body.title;
            EVENTS.time = req.body.time;
            EVENTS.date = req.body.date;
            EVENTS.image = req.body.image;
            EVENTS.location = req.body.location;
            EVENTS.address = req.body.address;

        EVENTS.save(function(err){
          if (err) {console.log(err); return;} 
          else{res.redirect('/');};
        });
    });
    app.get('/admin/events',ensureAuthenticated, function(req, res){
      // var query = User.find({}).limit(10);
      // query.exec(function (err, user) {
      //     if (err) {throw Error; }
          res.render('admin/events', {
            layout:'dashboard',
            // users: user,
            assets: '../../public/assets/'
          });
      // });
    });


/// Edit slideshow
    const Slideshow = require('../models/mongoose/slideshow');
    app.post("/admin/slideshow", ensureAuthenticated, function(req, res) {
        let SLIDES = new Slideshow();
            SLIDES.image = req.body.image;
            SLIDES.title = req.body.title;
            SLIDES.description = req.body.description;

        SLIDES.save(function(err){
          if (err) {console.log(err); return;} 
          else{
            console.log('Slide Saved...', SLIDES)
            // res.redirect('/');
          };
        });
        console.log(SLIDES);
    });
    app.get('/admin/slideshow', ensureAuthenticated, function(req, res){
      // var query = User.find({}).limit(10);
      // query.exec(function (err, user) {
      //     if (err) {throw Error; }
          res.render('admin/headerSlideshow', {
            layout:'dashboard',
            // users: user,
            assets: '../../public/assets/'
          });
      // });
    });


////////////////
// Passport
////////////////
  passport.use(new LocalStrategy(
    function(username, password, done) {
     User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
     });
    }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });



};

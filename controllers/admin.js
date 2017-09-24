

module.exports = function(app, menu) {
  var passport        = require('passport');
  var LocalStrategy   = require('passport-local').Strategy;
  var flash           = require('connect-flash');
  var mongoose        = require('mongoose');
  /// User Model
  var User            =  mongoose.model('User');
  var Rsvp            =  require('../models/mongoose/rsvp');
  
  // Registration for a login
    app.get('/register', function(req, res){
        res.render('register');
    });
    app.post('/register', function(req, res){
        var name = req.body.name;
        var email = req.body.email;
        var username = req.body.username;
        var password = req.body.password;
        var password2 = req.body.password2;
        
        // Validation
        req.checkBody('username', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('username', 'Username is required').notEmpty();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        var errors = req.validationErrors();
        if(errors){
            res.render('register',{
                errors: errors
            });
        } else{
            var newUser = new User ({
                name: name,
                email: email,
                username: username,
                password: password
            });
            // use the createUser function defined in the user models
            User.createUser(newUser, function(err, user){
                if(err) throw err;
                console.log(user);
            });

            req.flash('success_msg', 'You are registered and can now register');

            res.redirect('/register');
        }
      // res.redirect('/login');
    });

  /// Login
    app.get('/login', function(req, res){
      res.render('login');
    });
    app.post('/login', 
      passport.authenticate('local', {
          successRedirect:'/admin', 
          failureRedirect:'/login',
          failureFlash: true
      }),
      function(req, res){
      res.redirect('/admin');
    });

  // Log out
    app.get('/logout', function(req, res){
        req.logout();
        console.log("logging out ...")
        req.flash('success_msg', 'You are logged out');
        res.redirect('/');
    });

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

  /// Edit the couple
    const Couple = require('../models/mongoose/couple');
    app.get('/admin/couple', ensureAuthenticated, function(req, res){
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
    app.post("/admin/couple", ensureAuthenticated, function(req, res) {
        let COUPLE = new Couple();
            COUPLE.name = req.body.name;
            COUPLE.image = req.body.image;
            COUPLE.description = req.body.description;
            // COUPLE.type = req.body.type;

        COUPLE.save(function(err){
          if (err) {console.log(err); return;} 
          console.log('Slide Saved...', COUPLE)
          // else{res.redirect('/');};
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
    app.get('/admin/family',ensureAuthenticated, function(req, res){
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

  /// Edit bridesmaid
    app.get('/admin/bridesmaid',ensureAuthenticated, function(req, res){
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
  /// Edit groomsmen
    app.get('/admin/groomsmen',ensureAuthenticated, function(req, res){
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

  function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      // req.flash('success_msg','You are logged in');
      return next();
    } else {
      req.flash('error_msg','You are not logged in');
      res.redirect('/login');
    }
  }

};



module.exports = function(app, ensureAuthenticated) {
  var passport        = require('passport');
  var LocalStrategy   = require('passport-local').Strategy;
  var flash           = require('connect-flash');
  var mongoose        = require('mongoose');
  /// User Model
  var User            =  mongoose.model('User');
  
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

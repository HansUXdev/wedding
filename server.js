const express 					= require("express");
const app 							= express();
const path 							= require('path');
const cookieParser  		= require('cookie-parser');
const bodyParser 				= require("body-parser");
const methodOverride 		= require("method-override");
const exphbs 						= require("express-handlebars");
const expressValidator 	= require('express-validator');
const flash 						= require('connect-flash');
const session 					= require('express-session');
const passport 					= require('passport');
const LocalStrategy 		= require('passport-local').Strategy;
const fs      					= require('fs');
const exec    					= require('child_process').exec;
const favicon 					= require('serve-favicon');

// Set this = true when you want to deploy
  prod = false;

const localDB = 'mongodb://localhost/wedding';
const remoteDB = 'mongodb://heroku_cqrl2qbj:ctrfej5ogsnipkpjealrnh61da@ds015700.mlab.com:15700/heroku_cqrl2qbj';
var mongo = require('mongodb');
var mongoose = require('mongoose');
var User = require('./models/mongoose/users');

mongoose.Promise = global.Promise;
mongoose.connect(localDB, {
  useMongoClient: true,
  /* other options */
}); 
var datab = mongoose.connection;

// Connect Flash
app.use(flash());

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());


var port = process.env.PORT || 8000;

// Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static('public'));
app.use('/source', express.static('source'));
app.use(favicon(path.join(__dirname, 'public/assets/img', 'favicon.ico')));
	// Express Session
	app.use(session({
	    secret: 'secret',
	    saveUninitialized: true,
	    resave: true
	}));
	app.use(passport.initialize());
	app.use(passport.session());

	// Express Validator
	app.use(expressValidator({
	  errorFormatter: function(param, msg, value) {
	      var namespace = param.split('.'), 
	      root    = namespace.shift(), 
	      formParam = root;

	    while(namespace.length) {
	      formParam += '[' + namespace.shift() + ']';
	    }
	    return {
	      param : formParam,
	      msg   : msg,
	      value : value
	    };
	  }
	}));
	app.use(function (req, res, next) {
	  res.locals.success_msg = req.flash('success_msg');
	  res.locals.error_msg = req.flash('error_msg');
	  res.locals.error = req.flash('error');
	  res.locals.user = req.user || null;
	  next();
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

// Set Handlebars.
// Options for handlebars
// Main is the default layout
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", exphbs(
	{ defaultLayout: "offcanvas" }
));
app.set("view engine", "handlebars");
// Register Global Vars for static prototyping
	var menu = require("./src/data/menu.js");
	app.locals.menu = menu;
	// app.locals.assets = "public/assets/";
// Import your routes
	// require("./routes/sessions.js")(app, menu);
	require("./controllers/homeController.js")(app);
	require("./controllers/authentication.js")(app, ensureAuthenticated);
	require("./controllers/admin.js")(app, ensureAuthenticated);
	require("./controllers/familyController.js")(app, ensureAuthenticated);
	require("./controllers/blog_Controller.js")(app, ensureAuthenticated);

if (prod) {
	exec('gulp build', function (err, stdout, stderr) {
	  console.log(stdout);
	  console.log(stderr);
	});
};


app.listen(port,function(){
	console.log("App listening on PORT: "+port)
})


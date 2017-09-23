const express = require('express');
const router = express.Router();

// Article Model
let Article = require('../models/article');
// User Model
let User = require('../models/user');

// Add Route
router.get('/add', ensureAuthenticated, function(req, res){
  res.render('add_article', {
    title:'Add Article'
  });
});

// Add Submit POST Route
router.post('/add', function(req, res){
  req.checkBody('title','Title is required').notEmpty();
  //req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_article', {
      title:'Add Article',
      errors:errors
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;

    article.save(function(err){
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success','Article Added');
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, function(req, res){
  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    }
    res.render('edit_article', {
      title:'Edit Article',
      article:article
    });
  });
});

// Update Submit POST Route
router.post('/edit/:id', function(req, res){
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id:req.params.id}

  Article.update(query, article, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Article Updated');
      res.redirect('/');
    }
  });
});

// Delete Article
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Article.findById(req.params.id, function(err, article){
    if(article.author != req.user._id){
      res.status(500).send();
    } else {
      Article.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

// Get Single Article
router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, article){
    User.findById(article.author, function(err, user){
      res.render('article', {
        article:article,
        author: user.name
      });
    });
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;


// module.exports = function(app,menu) {
//   var passport        = require('passport');
//   var LocalStrategy   = require('passport-local').Strategy;
//   var flash           = require('connect-flash');

//   /// models
//   var User            = require('./models/mongoose/users');
//   // var Blog = require('../models/mongoose/blog');

//   /// view the blog
//     app.get('/blog', function(req, res) {
//       // Chain multiple models
//       // https://stackoverflow.com/questions/26402781/nodejs-mongoose-render-two-models-from-collections
//         // var Blog = mongoose.model('Blog');

//         Blog.find(function (err, post) {
//             // Events.find(function (err, events) {
//                 res.render('demo', {
//                     layout: 'bootstrap',
//                     blog : posts,
//                     // events : events
//                 });
//             // });
//         });
//     });

//   //// Backend
//     // app.post('/admin/blog', ensureAuthenticated, function(req, res) {
//     // });
//     // app.update('/admin/blog/edit', ensureAuthenticated, function(req, res) {
//     // });
//     // app.delete('/admin/blog/edit', ensureAuthenticated, function(req, res) {
//     // });
//     app.get('/admin/blog',ensureAuthenticated, function(req, res){
//       var query = Rsvp.find({}).limit(10);
//       query.exec(function (err, message) {
//           if (err) {throw Error; }
//           res.render('admin/messages', {
//             layout: 'dashboard',
//             messages: message,
//             assets: '../../public/assets/'
//           });
//       });
//     });



//   function ensureAuthenticated(req, res, next){
//     if(req.isAuthenticated()){
//       // req.flash('success_msg','You are logged in');
//       return next();
//     } else {
//       req.flash('error_msg','You are not logged in');
//       res.redirect('/login');
//     }
//   }

// };

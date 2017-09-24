
module.exports = function(app,ensureAuthenticated) {
  const mongoose        = require('mongoose');
  const express         = require('express');
  const router          = express.Router();
  var passport          = require('passport');
  var LocalStrategy     = require('passport-local').Strategy;
  var flash             = require('connect-flash');

  // Article Model
  let Blog = require('../models/mongoose/blog');
  // User Model
  let User = require('../models/mongoose/users');

  /// models
  // var User            = require('../models/mongoose/users');
  // var Blog = require('../models/mongoose/blog');

  /// view the blog
  app.get('/admin/blog', ensureAuthenticated, function(req, res){
    Blog.find(function (err, post) {
        res.render('blog/edit', {
          layout: 'dashboard',
          blog: post,
          assets: '../../public/assets/'
        });
    });
  });
  // app.get('/admin/blog/edit', ensureAuthenticated, function(req, res){
  //   Blog.find(function (err, post) {
  //       res.render('blog/edit', {
  //         layout: 'dashboard',
  //         blog: post,
  //         assets: '../../public/assets/'
  //       });
  //   });
  // });
  //// Post
    app.post('/admin/blog', ensureAuthenticated, function(req, res) {
      const errors = req.validationErrors();
      //// Check for errors
      if (errors) {
        res.render('/blog/edit', {
          // title:'Add Article',
          errors:errors
        });
      } 
      else{
        let blog = new Blog();
        blog.title = req.body.title;
        blog.categories = req.body.categories;
        // blog.author = req.body.author;
        blog.author = req.user._id;
        blog.body = req.body.body;

        blog.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','Post Added');
            res.redirect('/admin/blog');
          }
        });
      };
    });

  //// Update
    // app.update('/admin/blog/edit', ensureAuthenticated, function(req, res) {
    // });
  //// Delete
    // app.delete('/admin/blog/edit', ensureAuthenticated, function(req, res) {
    // });




// // Load Edit Form
    app.get('/admin/blog/:id', ensureAuthenticated, function(req, res){
      Blog.findById(req.params.id, function(err, blog){
        if(blog.author != req.user._id){
          req.flash('danger', 'Not Authorized');
          res.redirect('/');
        }
        res.render('/blog/edit', {
          // title:'Edit blog',
          errors:err,
          blog: blog
        });
      });
    });

// // Update Submit POST Route

    app.post('/admin/blog/:id', ensureAuthenticated, function(req, res){
      let blog = {};
      blog.title = req.body.title;
      blog.author = req.body.author;
      blog.body = req.body.body;

      let query = {_id:req.params.id}

      Blog.update(query, blog, function(err){
        if(err){
          console.log(" Problem with updating post... \n",err);
          return;
        } else {
          req.flash('success', 'Article Updated');
          res.redirect('/admin/blog');
        }
      });
    });

// // Delete Article
    app.delete('/admin/blog/:id', ensureAuthenticated, function(req, res){
      // if(!req.user._id){
      //   res.status(500).send();
      // }

      let query = {_id:req.params.id}

      Blog.findById(req.params.id, function(err, blog){
        if(blog.author != req.user._id){
          res.status(500).send();
        } else {
          Blog.remove(query, function(err){
            if(err){
              console.log(err);
            }
            res.send('Success');
          });
        }
      });
    });

// // Get Single Article
    app.get('/admin/blog/:id', ensureAuthenticated, function(req, res){
      Blog.findById(req.params.id, function(err, blog){
        User.find(blog.author, function(err, user){
          res.render('/blog/edit', {
            blog:blog,
            author: user.username
          });
        });
      });
    });


};

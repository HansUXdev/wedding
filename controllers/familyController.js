

module.exports = function(app, ensureAuthenticated) {
  const passport        = require('passport');
  const LocalStrategy   = require('passport-local').Strategy;
  const flash           = require('connect-flash');
  const mongoose        = require('mongoose');
  /// User Model
  const Couple          =  require('../models/mongoose/couple');
  const GroomFamily     =  require('../models/mongoose/GroomFamily');
  const BrideFamily     =  require('../models/mongoose/BrideFamily');
  const User            =  mongoose.model('User');
  const Rsvp            =  require('../models/mongoose/rsvp');
  

  function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      // req.flash('success_msg','You are logged in');
      return next();
    } else {
      req.flash('error_msg','You are not logged in');
      res.redirect('/login');
    }
  }

/// Edit the couple
    app.get('/admin/couple', ensureAuthenticated, function(req, res){
      Couple.find(function (err, couple) {
          res.render('admin/couple', {
            layout:'dashboard',
            couple : couple,
            assets: '../../public/assets/'
          });
      });          
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

/// Edit Groom
    app.get('/admin/family/groom', ensureAuthenticated, function(req, res){   
      GroomFamily.find(function (err, groomFam) {
        res.render('admin/groomFamily', {
          layout:'dashboard',
          groomFam: groomFam,
          // users: user,
          assets: '../../public/assets/'
        });
      });

    });
    app.post("/admin/family/groom", ensureAuthenticated, function(req, res) {
        let familyMember = new GroomFamily();
            familyMember.name = req.body.name;
            familyMember.relationship = req.body.relationship;
            familyMember.image = req.body.image;
            familyMember.description = req.body.description;
            // GROOM.type = req.body.type;
        familyMember.save(function(err){
          if (err) {console.log(err); return;} 
          console.log('Groom familyMember Member Saved...', familyMember)
          // else{res.redirect('/');};
        });
    });
/// Edit Bride
    app.get('/admin/family/bride', ensureAuthenticated, function(req, res){
      
      BrideFamily.find(function (err, brideFam) {
        res.render('admin/brideFamily', {
          layout:'dashboard',
          brideFam: brideFam,
          // users: user,
          assets: '../../public/assets/'
        });
      });
    });
    app.post("/admin/family/bride", ensureAuthenticated, function(req, res) {
        let familyMember = new BrideFamily();
            familyMember.name = req.body.name;
            familyMember.relationship = req.body.relationship;
            familyMember.image = req.body.image;
            familyMember.description = req.body.description;
            // GROOM.type = req.body.type;
        familyMember.save(function(err){
          if (err) {console.log(err); return;} 
          console.log('Bride family member saved...', familyMember)
          // else{res.redirect('/');};
        });
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



};

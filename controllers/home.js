
module.exports = function(app, menu) {
  var Rsvp = require('../models/mongoose/rsvp');

  app.get("/",function(req, res) {
    res.render("demo",
      {layout: 'bootstrap'}
    );
    // console.log(RSVP);
  });

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



  ///// create routes for layout pages
  menu.layouts.forEach(function(layouts) {
   app.get(layouts.url,function(req, res) {
     res.render(
       layouts.page,
       {layout: layouts.layout}
     );
   });
  });

  ///// create routes for each tempalate
  menu.templates.forEach(function(templates) {
   app.get(templates.url,function(req, res) {
     res.render("pages/"+templates.url);
   });
  });


};


var app = require('./../server');
var db = app.get('db');
module.exports = {
  post: function(req, res){
    console.log('This is the id: ', req.session.passport.user.user_id);
    var user_id=req.session.passport.user.user_id;
    db.user.create_dev([req.body.firstname, req.body.lastname, req.body.email, req.body.city, req.body.state, req.body.desc, req.body.type, user_id, `https://s3-us-west-1.amazonaws.com/devfinder/${req.session.imageInfo.key}`, req.body.github, req.body.twitter], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  update: function(req, res){
    var user_id=req.session.passport.user.user_id;
    db.user.update_dev([req.body.firstname, req.body.lastname, req.body.email, req.body.city, req.body.state, req.body.desc, req.body.type, user_id, req.body.github, req.body.twitter], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  updatepic: function(req, res){
    var user_id=req.session.passport.user.user_id;
    console.log(req.session.imageInfo.key)
    db.user.update_pic([user_id, `https://s3-us-west-1.amazonaws.com/devfinder/${req.session.imageInfo.key}`], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  addPortfolio: function(req, res){
    var user_id=req.session.passport.user.user_id;
    db.user.create_portfolio([user_id, req.body.title, req.body.description, req.body.image, req.body.link], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  addEducation: function(req, res){
    var user_id=req.session.passport.user.user_id;
    db.user.create_education([user_id, req.body.school, req.body.description, req.body.start_month, req.body.start_year, req.body.end_month, req.body.end_year], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  addExperience: function(req, res){
    var user_id=req.session.passport.user.user_id;
    db.user.create_experience([user_id, req.body.company, req.body.title, req.body.description, req.body.start_month, req.body.start_year, req.body.end_month, req.body.end_year], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}

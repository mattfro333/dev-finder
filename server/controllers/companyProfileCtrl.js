var app = require('./../server');
var db = app.get('db');
module.exports = {
  get: function(req, res){
    db.companyProfile.get([req.params.id], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  get_jobs: function(req, res){
    db.companyProfile.get_jobs([req.body.id], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  update_company: function(req, res){
    db.companyProfile.update_company([req.body.id, req.body.name, req.body.city, req.body.state, req.body.founded, req.body.bio], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}

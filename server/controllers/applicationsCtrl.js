var app = require('./../server');
var db = app.get('db');
module.exports = {
  get: function(req, res){
    db.applications.get([req.session.passport.user.user_id], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  delete: function(req, res){
    db.applications.delete([req.session.passport.user.user_id, req.params.id], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  post: function(req, res){
    db.applications.post([req.session.passport.user.user_id, req.params.jobId], function(err, results){
      if(err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}
 
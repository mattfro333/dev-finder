var app = require('./../server');
var db = app.get('db');
module.exports = {
  get: function(req, res){
    db.applicants.get([req.session.passport.user.user_id], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  delete: function(req, res){
    db.applicants.delete([req.params.userid, req.params.jobid], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}
   
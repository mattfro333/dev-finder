var app = require('./../server');
var db = app.get('db');
module.exports = {
  get: function(req, res){
    if(req.query.limit){
      db.applications.get_6([req.session.passport.user.user_id],(err, results)=>{
        if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
      })
    } else{
      db.applications.get([req.session.passport.user.user_id], function(err, results){
        if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
      })
    }
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
    let date = new Date()
    db.applications.post([req.session.passport.user.user_id, req.params.jobId, date], function(err, results){
      if(err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  companyGet: function(req, res){
    db.applications.company_get([req.params.company_id], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}

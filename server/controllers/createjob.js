var app = require('./../server');
var db = app.get('db');
module.exports = {
  post: function(req, res){
    var user_id=req.session.passport.user.user_id;
    var filled = 'false'
    db.createjob.post([user_id,req.body.jobtitle, req.body.jobdesc, req.body.location, req.body.time, filled], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}

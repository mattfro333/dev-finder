var app = require('./../server');
var db = app.get('db');
module.exports = {
  post: function(req, res){
    var user_id=req.session.passport.user.user_id;
    db.user.create_company([req.body.name, req.body.city, req.body.state, req.body.description, user_id, 'http://i.imgur.com/PrvsefK.png'], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}

var app = require('./../server');
var db = app.get('db');
module.exports = {
  post: function(req, res){
    console.log('This is the id: ', req.session.passport.user.user_id);
    var user_id=req.session.passport.user.user_id;
    db.user.create_dev([req.body.firstname, req.body.lastname, req.body.email, req.body.city, req.body.state, req.body.desc, req.body.type, user_id, 'http://i.imgur.com/PrvsefK.png'], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}

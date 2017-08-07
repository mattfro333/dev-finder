var app = require('./../server');
var db = app.get('db');
module.exports = {
  post: function(req, res){
    var user_id=req.session.passport.user.user_id;
    db.user.create_company([req.body.name, req.body.city, req.body.state, req.body.description, user_id, `https://s3-us-west-1.amazonaws.com/s3/buckets/devfind/images${req.session.imageInfo.key}`], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  },
  put: (req, res)=>{
    db.user.update_company([req.body.name, req.body.city, req.body.state, req.body.description, user_id], (err, results) =>{
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results)
    })
  },
  updatepic: function(req, res){
    var user_id=req.session.passport.user.user_id;
    db.companyProfile.update_pic([user_id, `https://s3-us-west-1.amazonaws.com/s3/buckets/devfind/images${req.session.imageInfo.key}`], function(err, results){
      console.log(results)
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}

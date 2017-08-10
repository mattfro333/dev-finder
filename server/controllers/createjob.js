var app = require('./../server');
var db = app.get('db');
module.exports = {
  post: (req, res) => {
    db = req.app.get('db');
    var user_id=req.session.passport.user.user_id;
    var filled = 'false'
    db.createjob.post([user_id,req.body.jobtitle, req.body.jobdesc, req.body.city, req.body.state, req.body.time, filled, req.body.skills]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  get: (req, res) => {
    db = req.app.get('db');
    var user_id=req.session.passport.user.user_id;
    db.createjob.get(user_id).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  getComp: (req, res) => {
    db = req.app.get('db');
    var user_id=req.session.passport.user.user_id;
    console.log(user_id);
    db.createjob.getComp(user_id).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  }
}

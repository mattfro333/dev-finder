var app = require('./../server');
var db = app.get('db');
module.exports = {
  get: (req, res) => {
    db = req.app.get('db');
    db.applicants.get([req.session.passport.user.user_id]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  delete: (req, res) => {
    db = req.app.get('db');
    db.applicants.delete([req.params.userid, req.params.jobid]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  }
}

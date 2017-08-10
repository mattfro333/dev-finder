var app = require('./../server');
// var db = app.get('db');
module.exports = {
  get: (req, res) => {
    db = req.app.get('db');
      db.applications.get_6([req.session.passport.user.user_id]).then(results=>{

      res.send(results);
      }).catch(err=>console.error(err));
    },
  delete: (req, res) => {
    db = req.app.get('db');
    db.applications.delete([req.session.passport.user.user_id, req.params.id]).then (results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  post: (req, res) => {
    db = req.app.get('db');
    let date = new Date()
    db.applications.post([req.session.passport.user.user_id, req.params.jobId, date]).then (results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  companyGet: (req, res) => {
    db = req.app.get('db');
    db.applications.company_get([req.params.company_id]).then (results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  }
}

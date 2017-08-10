var app = require('./../server');
var db = app.get('db');
module.exports = {
  get: (req, res) => {
    db = req.app.get('db');
    db.companyProfile.get([req.params.id]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  get_jobs: (req, res) => {
    db = req.app.get('db');
    db.companyProfile.get_jobs([req.body.id]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  update_company: (req, res) => {
    db = req.app.get('db');
    db.companyProfile.update_company([req.body.id, req.body.name, req.body.city, req.body.state, req.body.founded, req.body.bio]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  }
}

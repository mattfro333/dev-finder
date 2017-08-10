var app = require('./../server');
// var db = app.get('db');
module.exports = {
    get: (req, res) => {
        db = req.app.get('db');
        db.jobs.get(['%'+req.params.jobName+'%']).then(results=>{

            return res.send(results)
        }).catch(err=>console.error(err));
    },
    getOne: (req, res) => {
        db = req.app.get('db');
        db.jobs.get_one([req.params.id]).then(results=>{

           return res.send(results)
        }).catch(err=>console.error(err));
    },
    getListings: (req, res) => {
        db = req.app.get('db');
      db.jobs.get_company_listings([req.params.id]).then(results=>{

        return res.status(200).send(results)
      }).catch(err=>console.error(err));
    }
}

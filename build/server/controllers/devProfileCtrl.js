var app = require('./../server');
var db = app.get('db');
module.exports = {
    //req.session.passport.user.user_id
    //1 NEEDS TO BE THE USERID
    get: function(req, res, next) {
        db.devProfile.get([req.params.id], function(err, results) {
            if (err) {
                console.log('get profile err: ', err);
                return res.status(500).send(err);
            }
            db.devProfile.get_education([req.params.id], function(err, results_education) {
                if (err) {
                    console.log('get education err: ', err);
                    return res.status(500).send(err);
                }
                db.devProfile.get_jobs([req.params.id], function(err, results_jobs) {
                    if (err) {
                        console.log('get job err: ', err);
                        return res.status(500).send(err);
                    }
                    db.devProfile.get_portfolios([req.params.id], function(err, results_portfolios) {
                        if (err) {
                            console.log('get job err: ', err);
                            return res.status(500).send(err);
                        }
                    res.status(200).send([results, results_education, results_jobs, results_portfolios])
                })
            })
        })
    })
  },
  getProfile: (req, res, next) => {
    db.devProfile.get_profile([req.params.id], (err, profile) =>{
      if (err) {
          console.log('get profile err: ', err);
          return res.status(500).send(err);
      }
      res.status(200).send(profile)
    })
  },
  gettheUser: (req, res, next) => {
    var user_id=req.session.passport.user.user_id;
    console.log('profile ctrl', user_id);
    db.devProfile.get_user([user_id], (err, profile) =>{
      if (err) {
          console.log('get profile err: ', err);
          return res.status(500).send(err);
      }
      res.status(200).send(profile)
    })
  }
}

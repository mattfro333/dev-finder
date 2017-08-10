var app = require('./../server');

module.exports = {
    //req.session.passport.user.user_id
    //1 NEEDS TO BE THE USERID
    get: (req, res) => {
 db = req.app.get('db');
        db.devProfile.get([req.params.id]).then(results=> {
console.log('get it')
        db.devProfile.get_education([req.params.id]).then(results_education=> {

          db.devProfile.get_jobs([req.params.id]).then(results_jobs=> {

            db.devProfile.get_portfolios([req.params.id]).then(results_portfolios=> {

                return  res.send([results, results_education, results_jobs, results_portfolios])
              })
          })
      })
    }).catch(err=>console.error(err))
  },
  getProfile: (req, res, next) => {
     db = req.app.get('db');
    db.devProfile.get_profile([req.params.id]).then(profile => {

      res.status(200).send(profile)
    }).catch(err=>console.error(err));
  },
  gettheUser: (req, res, next) => {
     db = req.app.get('db');
    var user_id=req.session.passport.user.user_id;
    console.log('profile ctrl', user_id);
    db.devProfile.get_user([user_id]).then( profile=> {

      res.status(200).send(profile)
    }).catch(err=>console.error(err));
  }
}

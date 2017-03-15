var app = require('./../server');
var db = app.get('db');
module.exports = {
    //req.session.passport.user.user_id
    //1 NEEDS TO BE THE USERID
    get: function(req, res, next) {
        db.devProfile.get([1], function(err, results) {
            if (err) {
                console.log('get profile err: ', err);
                return res.status(500).send(err);
            }
            console.log(results);
            db.devProfile.get_education([1], function(err, results_education) {
                if (err) {
                    console.log('get education err: ', err);
                    return res.status(500).send(err);
                }
                console.log(results_education);
                db.devProfile.get_jobs([1], function(err, results_jobs) {
                    if (err) {
                        console.log('get job err: ', err);
                        return res.status(500).send(err);
                    }
                    db.devProfile.get_portfolios([1], function(err, results_portfolios) {
                        if (err) {
                            console.log('get job err: ', err);
                            return res.status(500).send(err);
                        }
                    console.log(results_jobs);
                    res.status(200).send([results, results_education, results_jobs, results_portfolios])
                })
            })
        })
    })
}
}

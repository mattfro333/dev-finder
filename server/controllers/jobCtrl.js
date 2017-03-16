var app = require('./../server');
var db = app.get('db');
module.exports = {
    get: function(req, res){
        console.log('hello')
        db.jobs.get(['%'+req.params.jobName+'%'], function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            res.send(results)
        })
    },
    getOne: function(req, res){
        db.jobs.get_one([req.params.id], function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            res.send(results)
        })
    }
}

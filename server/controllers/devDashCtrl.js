var app = require('./../server');
var db = app.get('db');
module.exports = {
    newjobs: function(req, res){

        db.devDash.newjobs(function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            res.send(results)
        })
    }
}

var app = require('./../server');
var db = app.get('db');
module.exports={
    getComps: function(req, res){
        console.log('Getting companies')
        db.search.getComps(['%'+req.params.compName+'%'], function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            return res.send(results)
        })
    },
    getDevs: function(req, res){
        console.log('getting developers')
        db.search.getDevs(['%'+req.params.devName+'%'], function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            return res.send(results)
        })
    }
}
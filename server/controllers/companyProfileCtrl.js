var app = require('./../server');
var db = app.get('db');
module.exports = {
  get: function(req, res){
    db.companyProfile.get([1], function(err, results){
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    })
  }
}
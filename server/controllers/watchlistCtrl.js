var app = require('./../server');

module.exports = {
  get: function(req, res){
    db = req.app.get('db');
    db.watchlist.get([req.session.passport.user.user_id]).then(  results=>{

      res.send(results);
    }).catch(err=>console.error(err))
  },
   get6: function(req, res){
     db = req.app.get('db');
    db.watchlist.get6([req.session.passport.user.user_id]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err))
  },
  delete: function(req, res){
    db = req.app.get('db');
    db.watchlist.delete([req.session.passport.user.user_id, req.params.id]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err))
  },
  post: function(req, res){
    db = req.app.get('db');
    db.watchlist.post([req.session.passport.user.user_id, req.params.jobId]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err))
  }
}

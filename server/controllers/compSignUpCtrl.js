var app = require('./../server');
var db = app.get('db');
module.exports = {
  post: (req, res) => {
    db = req.app.get('db');
    var user_id=req.session.passport.user.user_id;
    db.user.create_company([req.body.name, req.body.city, req.body.state, req.body.description, user_id, `https://s3-us-west-1.amazonaws.com/devfind/${req.session.imageInfo.key}`]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  put: (req, res)=>{
    db = req.app.get('db');
    db.user.update_company([req.body.name, req.body.city, req.body.state, req.body.description, user_id]).then(results =>{

      res.send(results)
    }).catch(err=>console.error(err));
  },
  updatepic: (req, res)=>{
    db = req.app.get('db');
    var user_id=req.session.passport.user.user_id;
    db.companyProfile.update_pic([user_id, `https://s3-us-west-1.amazonaws.com/devfind/${req.session.imageInfo.key}`]).then(results =>{
      console.log(results)

      res.send(results);
    }).catch(err=>console.error(err));
  }
}

var app = require('./../server');
// var db = app.get('db');
module.exports = {
  post: (req, res) => {
    db = req.app.get('db');
    var user_id=req.session.passport.user.user_id;
    db.user.create_dev([req.body.firstname, req.body.lastname, req.body.email, req.body.city, req.body.state, req.body.desc, req.body.type, user_id, `https://s3-us-west-1.amazonaws.com/devfind/${req.session.imageInfo.key}`, req.body.github, req.body.twitter, req.body.skills]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  update: (req, res) => {
    db = req.app.get('db');
    let date = new Date()
    var user_id=req.session.passport.user.user_id;
    db.user.update_dev([req.body.firstname, req.body.lastname, req.body.email, req.body.city, req.body.state, req.body.desc, req.body.type, user_id, req.body.github, req.body.twitter, req.body.skills]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  updatepic: (req, res) => {
    db = req.app.get('db');
    var user_id=req.session.passport.user.user_id;
    db.user.update_pic([user_id, `https://s3-us-west-1.amazonaws.com/devfind/${req.session.imageInfo.key}`]).then(results=>{
      console.log(results)

      res.send(results);
    })
  },
  addPortfolio: (req, res) => {
    db = req.app.get('db');
    let date = new Date()
    var user_id=req.session.passport.user.user_id;
    db.user.create_portfolio([user_id, req.body.title, req.body.description, `https://s3-us-west-1.amazonaws.com/devfind/${req.session.imageInfo.key}`, req.body.link, req.body.skills, date]).then(results=>{

      res.send(results);
    })
  },
  addEducation: (req, res) => {
    let date = new Date()
    var user_id=req.session.passport.user.user_id;
    db.user.create_education([user_id, req.body.school, req.body.description, req.body.start_month, req.body.start_year, req.body.end_month, req.body.end_year]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  addExperience: (req, res) => {
    let date = new Date()
    var user_id=req.session.passport.user.user_id;
    db.user.create_experience([user_id, req.body.company, req.body.title, req.body.description, req.body.start_month, req.body.start_year, req.body.end_month, req.body.end_year, date]).then(results=>{
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(results);
    }).catch(err=>console.error(err));
  },
  deletePortfolio: (req, res) => {
    db.user.delete_portfolio([req.body.id]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  },
  deleteExperience: (req, res) => {
    db = req.app.get('db');
    console.log(req.body.id);
    db.user.delete_experience([req.body.id]).then(results=>{

      res.send(results);
    }).catch(err=>console.error(err));
  }
}

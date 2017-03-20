var app = require('./../server');
var db = app.get('db');

module.exports = {
  get: (req, res) => {
    db.skills.GET_SKILLS((err, skills)=>{
      if (err){
        console.error(err);
        return res.send(err);
      }
      res.send(200).send(skills)
    })
  }
}

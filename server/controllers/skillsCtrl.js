var app = require('./../server');
var db = app.get('db');

module.exports = {
  getSkills: (req, res) => {

    db.skills.GET_SKILLS((err, skills)=>{
      if (err){
        console.error(err);
        return res.send(err);
      }
      console.log('skills grabbed');
      res.send(skills)
    })
  }
}

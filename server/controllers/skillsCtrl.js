var app = require('./../server');
// var db = app.get('db');

module.exports = {
  getSkills: (req, res) => {
    db = req.app.get('db');
    // console.log(Object.keys(db.user));
        // console.log(Object.keys(db));
    db.skills.GET_SKILLS().then(skills=>{
      console.log('skills grabbed');
      res.send(skills)
    }).catch(err=>{
    console.error(err);
    return res.send(err);
  })
 }
}

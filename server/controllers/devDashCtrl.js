var app = require('./../server');
// var db = app.get('db');
module.exports = {
    newjobs: (req, res) => {
        db = req.app.get('db');

        db.devDash.newjobs().then( results=> {

            res.send(results)
        }).catch(err=>console.error(err));
    }
}

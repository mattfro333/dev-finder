var app = require('./../server');
var db = app.get('db');
module.exports={
    getComps: (req, res) => {
      db = req.app.get('db');
        console.log('Getting companies')
        db.search.getComps(['%'+req.params.compName+'%']).then(results=>{

            return res.send(results)
        }).catch(err=>console.error(err));
    },
    getDevs: (req, res) => {
      db = req.app.get('db');
        console.log('getting developers')
        db.search.getDevs(['%'+req.params.devName+'%']).then(results=>{
          
            return res.send(results)
        }).catch(err=>console.error(err));
    }
}

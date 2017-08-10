var app = require('./../server');

module.exports = {
    getRooms: (req, res) => {
  db = req.app.get('db');
        db.messaging.rooms([req.session.passport.user.user_id]).then( results=> {

            res.send(results)
        }).catch(err=>console.error(err));
    },
    getThreads: (req, res) => {
        db = req.app.get('db');
        db.messaging.threads([req.body.id]).then( results=> {

            res.send(results)
        }).catch(err=>console.error(err));
    },
    sendMessage: (req, res) => {
  db = req.app.get('db');
        db.messaging.post([req.session.passport.user.user_id, req.body.message, req.body.room_id, req.body.createdtime, req.body.recievingUser]).then( results=> {

            res.send(results)
        }).catch(err=>console.error(err));
    },
    createRoom: (req, res) => {
        db = req.app.get('db');
        db.messaging.create_room([req.body.user1_id, req.body.user2_id, req.body.user1_name, req.body.user2_name]).then( results=> {

            res.send(results)
        }).catch(err=>console.error(err));
    },
    newMessages: (req, res)=>{
        db = req.app.get('db');
      db.messaging.new_message_query([req.session.passport.user.user_id]).then( results=> {

        res.send(response)
      }).catch(err=>console.error(err));
    },
    deleteRoom: (req, res) => {
        db = req.app.get('db');
        db.messaging.delete_room([req.body.id]).then( results=> {

            res.send(results)
        }).catch(err=>console.error(err));
    }
}

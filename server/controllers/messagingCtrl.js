var app = require('./../server');
var db = app.get('db');
module.exports = {
    getRooms: function(req, res){

        db.messaging.rooms([req.session.passport.user.user_id],function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            res.send(results)
        })
    },
    getThreads: function(req, res){
        db.messaging.threads([req.body.id],function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            res.send(results)
        })
    },
    sendMessage: function(req, res){

        db.messaging.post([req.session.passport.user.user_id, req.body.message, req.body.room_id, req.body.createdtime],function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            res.send(results)
        })
    },
    createRoom: function(req, res){
        db.messaging.create_room([req.body.user1_id, req.body.user2_id, req.body.user1_name, req.body.user2_name],function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            res.send(results)
        })
    },
    deleteRoom: function(req, res){
        db.messaging.delete_room([req.body.id],function(err, results){
            if(err){
                console.error(err);
                return res.send(err);
            }
            res.send(results)
        })
    }
}

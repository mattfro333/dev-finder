var app = require('./../server');
var db = app.get('db');


// BCRYPT
var bcrypt = require('bcryptjs');

// HASH PASSWORD //
function hashPassword(password) {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	return hash;
}

module.exports = {

	// REGISTER USER //
	register: function(req, res, next) {
		let userID
		// Hash the users password for security
		req.body.password = hashPassword(req.body.password);

		req.body.username = req.body.username.toLowerCase();
		db.user.insert([req.body.username, req.body.password, req.body.company], function(err, user) {
			// If err, send err
			if (err) {
				console.log('Registration error: ', err);

				return res.status(500).send(err);
			}
			else{
				delete user.password;
				userID = user[0].user_id
				if(req.body.company === true){
					db.user.create_company([userID],(err, user)=>{
						res.status(200).send(user)
					})
				}else{
					db.user.create_dev([userID], (err, user)=>{
						res.status(200).send(user)
					})
				}
			}
		});
	},

	// RETURN CURRENT USER //
	me: function(req, res, next) {
		// Return user
		return res.status(200)
			.send(req.user);
	},
};

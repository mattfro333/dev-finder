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
		var user = req.body;


		// Hash the users password for security
		user.password = hashPassword(user.password);

		user.username = user.username.toLowerCase();
		console.log('creating user', user)
		db.user.insert([user.username, user.password, user.company], function(err, user) {
			// If err, send err
			if (err) {
				console.log('Registration error: ', err);

				return res.status(500)
					.send(err);
			}

			delete user.password;

			res.status(200)
				.send(user);
		});
	},

	// RETURN CURRENT USER //
	me: function(req, res, next) {
		// Return user
		return res.status(200)
			.send(req.user);
	},
};

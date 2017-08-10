// PASSPORT //
var passport = require('passport');
var LocalStrategy = require('passport-local')
	.Strategy;

// BCRYPT //
var bcrypt = require('bcryptjs');

// APP //
var app = require('./../server');
var db = app.get('db');

// VERIFY PASSWORD //
function verifyPassword(submitedPass, userPass) {
	return bcrypt.compareSync(submitedPass, userPass);
}

// RUN WHEN LOGGING IN //
passport.use(new LocalStrategy({
	usernameField: 'username',
	passwordField: 'password'
}, function(username, password, done) {
	username = username.toLowerCase();
// console.log(username);
// console.log(done);
let db = app.get('db');
// console.log(db.user);
	db.user.auth_user([username]).then( user=> {
		// console.log("user", user);
		user = user[0];

// console.log(user)
		// If no user if found, return false
		if (!user) return done(null, false);

		// If user is found, check to see if passwords match. If so, return user
		if (verifyPassword(password, user.password)) {
			console.log("Verified Password")
			delete user.password;
			return done(null, user);
		}

		// If no match, return false
		return done(null, false);
	}).catch(err=>console.error(err));
}));

// Puts the user on the session
passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

module.exports = passport;

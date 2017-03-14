//Dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const localAuth = require('passport-local');
const CryptoJS = require('crypto-js');
//Our Modules

const config = require('./config');
//Set up App
const app = module.exports = express();

app.use(bodyParser.json())


app.use(cors());
//Set up Session
app.use(session({
	secret: config.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
}));
//Set up Database
const massiveInstance = massive.connectSync({
  connectionString: config.massiveUri
})
app.set('db', massiveInstance);
var db = app.get('db')



//AUTHENTICATION
//Set up Passport
var passport = require('./services/passport');
app.use(passport.initialize());
app.use(passport.session());
//passport endpoints
app.post('/api/login', passport.authenticate('local', {
	successRedirect: '/api/me'
}));
app.get('/api/logout', function(req, res, next) {
	req.logout();
	return res.status(200)
		.send('logged out');
});
//policies
var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) return res.status(401)
		.send();
	return next();
};


const userCtrl = require('./controllers/userCtrl');
const watchCtrl = require('./controllers/watchlistCtrl');
const applicationsCtrl = require('./controllers/applicationsCtrl');

//user endpoints
app.post('/api/register', userCtrl.register);

app.get('/api/test', (req, res) => {
	console.log('working')
	res.status(200).send('test')
})


app.get('/api/me', isAuthed, userCtrl.me)

//watchlist endpoints
app.get('/api/flaggedJobs', watchCtrl.get);
app.delete('/api/flaggedJobs', watchCtrl.delete);


//applications endpoints
app.get('/api/applications', applicationsCtrl.get);
app.delete('/api/applications', applicationsCtrl.delete);

//applicants endpoints
app.get('/api/applicants', applicants.get);
app.delete('/api/applicants', applicants.delete);

//Server



const emailCtrl = require('./e-mailer.js');

app.post('/api/email', emailCtrl.sendEmail);




const PORT = config.port

app.listen(PORT, function(){
  console.log('Listening on port: '+ PORT)
})

//AWS-FineUploader Encryption

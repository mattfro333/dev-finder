//Dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const localAuth = require('passport-local');
const CryptoJS = require('crypto-js');
const aws = require('aws-sdk');
const connect = require('connect');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

//Our Modules
// const config = require('./config');

//Set up App

const PORT = process.env.port
const app = connect()
app.use(cookieParser())
app.use(cookieSession({ secret: 'tobo!', cookie: { maxAge: 60 * 60 * 1000 }}));
app.set('port', (process.env.PORT || PORT));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false, limit: '50mb'}))
app.use(cors());
app.use(express.static('./build'));
//Amazon Session Keys
const clientSecretKey = process.env.secretKey;
const serverPublicKey = process.env.accessKey;
const serverSecretKey = process.env.secretKey;
const expectedBucket = 'devfinder';
const expectedHostname = 'https://secret-forest-37773.herokuapp.com/';
const expectedMinSize = 0;
const expectedMaxSize = null;
let s3
aws.config.update({
    accessKeyId: serverPublicKey,
    secretAccessKey: serverSecretKey
});
s3 = new aws.S3()

//Set up Session
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: false,
	resave: false
}));

//Set up Database
const massiveInstance = massive.connectSync({
  connectionString: process.env.massiveUri
})
app.set('db', massiveInstance);
var db = app.get('db')

//Initialize the Tables for the Database
// function initDb(){
//     console.log('creating tables')
//     db.init.create_tables([], function(err, results){
//       if (err){
//         console.error(err);
//       }
//       console.log(results)
//     })
// }
// initDb();

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

//AMAZON S3 endpoints

app.post("/s3handler", function(req, res) {
    if (typeof req.query.success !== "undefined") {
      //Save to db
      // Send back 200.
      req.session.imageInfo = req.body
      console.log(req.session.imageInfo)
      res.status(200).send('item saved')
        // verifyFileInS3(req, res);
    }
    else {
        signRequest(req, res);
    }
});

const userCtrl = require('./controllers/userCtrl');
const watchCtrl = require('./controllers/watchlistCtrl');
const applicationsCtrl = require('./controllers/applicationsCtrl');
const devProfileCtrl = require('./controllers/devProfileCtrl');
const devSignup = require('./controllers/devsignUpCtrl');
const companyProfileCtrl = require('./controllers/companyProfileCtrl')
const compSignup = require('./controllers/compSignUpCtrl')
const createJob = require('./controllers/createjob')
const jobCtrl = require('./controllers/jobCtrl')
const devDashCtrl = require('./controllers/devDashCtrl')
const messagingCtrl = require('./controllers/messagingCtrl')
const applicants = require('./controllers/applicantsCtrl')
const skillsCtrl = require('./controllers/skillsCtrl')
const searchCtrl = require('./controllers/searchCtrl')
//user endpoints
app.post('/api/register', userCtrl.register, passport.authenticate('local', {
	successRedirect: '/api/me'
}));

app.get('/api/test', (req, res) => {
	console.log('working')
	res.status(200).send('test')
})


app.get('/api/me', isAuthed, userCtrl.me)

//watchlist endpoints
app.post('/api/flagAJob/:jobId', watchCtrl.post)
app.get('/api/flaggedJobs', watchCtrl.get);
app.get('/api/flaggedJobs6', watchCtrl.get6);
app.delete('/api/flaggedJobs', watchCtrl.delete);


//applications endpoints
app.post('/api/application/:jobId', applicationsCtrl.post)
app.get('/api/applications', applicationsCtrl.get);
app.delete('/api/applications', applicationsCtrl.delete);
app.get('/api/company/applications/:company_id', applicationsCtrl.companyGet);

//applicants endpoints
app.get('/api/applicants', applicants.get);
//app.delete('/api/applicants', applicants.delete);

//devProfile endpoints
app.get('/api/devProfile/:id', devProfileCtrl.get);
app.post('/api/addPortfolio', devSignup.addPortfolio);
app.post('/api/addEducation', devSignup.addEducation);
app.post('/api/addExperience', devSignup.addExperience);
app.post('/api/deletePortfolio', devSignup.deletePortfolio);
app.post('/api/deleteExperience', devSignup.deleteExperience);

//devDashboard endpoints
app.get('/api/newjobs', devDashCtrl.newjobs);

//CopmanyProfile Endooints
app.get('/api/companyProfile/:id', companyProfileCtrl.get);
app.put('/api/updatecomppic', compSignup.updatepic)

app.post('/api/companyJobs', companyProfileCtrl.get_jobs);
app.put('/api/updatecompanyprofile', companyProfileCtrl.update_company);

//devSignup endpoints
app.post('/api/createdev', devSignup.post);
app.put('/api/updatedev', devSignup.update);
app.put('/api/updatepic', devSignup.updatepic);
app.post('/api/createcomp', compSignup.post);
app.put('/api/updatecomp', compSignup.put);
app.post('/api/get/user/message', devProfileCtrl.gettheUser);

//job endpoints
app.get('/api/jobs/:jobName', jobCtrl.get);
app.get('/api/job/:id', jobCtrl.getOne);
app.get('/api/companyJobListings/:id', jobCtrl.getListings)

//newjob endpoints
app.post('/api/createjob', createJob.post);
app.post('/api/name', createJob.get);
app.post('/api/companyInfo', createJob.getComp)

//messaging endpoints
app.get('/api/rooms', messagingCtrl.getRooms);
app.put('/api/threads', messagingCtrl.getThreads);
app.post('/api/sendmessage', messagingCtrl.sendMessage);
app.post('/api/newRoom', messagingCtrl.createRoom);
app.get('/api/newmessages', messagingCtrl.newMessages);
app.post('/api/deleteRoom', messagingCtrl.deleteRoom);

//skills endpoints
app.get('/api/skills', skillsCtrl.getSkills)

//search endpoints
app.get('/api/companies/:compName', searchCtrl.getComps)
app.get('/api/developers/:devName', searchCtrl.getDevs)
//Server



const emailCtrl = require('./e-mailer.js');

app.post('/api/email', emailCtrl.sendEmail);





//AWS-FineUploader Encryption

function signRequest(req, res) {
    if (req.body.headers) {
        signRestRequest(req, res);
    }
    else {
        signPolicy(req, res);
    }
}

// Signs multipart (chunked) requests.  Omit if you don't want to support chunking.
function signRestRequest(req, res) {
    var version = req.query.v4 ? 4 : 2,
        stringToSign = req.body.headers,
        signature = version === 4 ? signV4RestRequest(stringToSign) : signV2RestRequest(stringToSign);

    var jsonResponse = {
        signature: signature
    };

    res.setHeader("Content-Type", "application/json");

    if (isValidRestRequest(stringToSign, version)) {
        res.end(JSON.stringify(jsonResponse));
    }
    else {
        res.status(400);
        res.end(JSON.stringify({invalid: true}));
    }
}

function signV2RestRequest(headersStr) {
    return getV2SignatureKey(clientSecretKey, headersStr);
}

function signV4RestRequest(headersStr) {
    var matches = /.+\n.+\n(\d+)\/(.+)\/s3\/aws4_request\n([\s\S]+)/.exec(headersStr),
        hashedCanonicalRequest = CryptoJS.SHA256(matches[3]),
        stringToSign = headersStr.replace(/(.+s3\/aws4_request\n)[\s\S]+/, '$1' + hashedCanonicalRequest);

    return getV4SignatureKey(clientSecretKey, matches[1], matches[2], "s3", stringToSign);
}

// Signs "simple" (non-chunked) upload requests.
function signPolicy(req, res) {
    var policy = req.body,
        base64Policy = new Buffer(JSON.stringify(policy)).toString("base64"),
        signature = req.query.v4 ? signV4Policy(policy, base64Policy) : signV2Policy(base64Policy);

    var jsonResponse = {
        policy: base64Policy,
        signature: signature
    };

    res.setHeader("Content-Type", "application/json");

    if (isPolicyValid(req.body)) {
        res.end(JSON.stringify(jsonResponse));
    }
    else {
        res.status(400);
        res.end(JSON.stringify({invalid: true}));
    }
}

function signV2Policy(base64Policy) {
    return getV2SignatureKey(clientSecretKey, base64Policy);
}

function signV4Policy(policy, base64Policy) {
    var conditions = policy.conditions,
        credentialCondition;

    for (var i = 0; i < conditions.length; i++) {
        credentialCondition = conditions[i]["x-amz-credential"];
        if (credentialCondition != null) {
            break;
        }
    }

    var matches = /.+\/(.+)\/(.+)\/s3\/aws4_request/.exec(credentialCondition);
    return getV4SignatureKey(clientSecretKey, matches[1], matches[2], "s3", base64Policy);
}

// Ensures the REST request is targeting the correct bucket.
// Omit if you don't want to support chunking.
function isValidRestRequest(headerStr, version) {
    if (version === 4) {
        return new RegExp("host:" + expectedHostname).exec(headerStr) != null;
    }

    return new RegExp("\/" + expectedBucket + "\/.+$").exec(headerStr) != null;
}

// Ensures the policy document associated with a "simple" (non-chunked) request is
// targeting the correct bucket and the min/max-size is as expected.
// Comment out the expectedMaxSize and expectedMinSize variables near
// the top of this file to disable size validation on the policy document.
function isPolicyValid(policy) {
    var bucket, parsedMaxSize, parsedMinSize, isValid;
    if (!policy.conditions) return;
    policy.conditions.forEach(function(condition) {
        if (condition.bucket) {
            bucket = condition.bucket;
        }
        else if (condition instanceof Array && condition[0] === "content-length-range") {
            parsedMinSize = condition[1];
            parsedMaxSize = condition[2];
        }
    });

    isValid = bucket === expectedBucket;

    // If expectedMinSize and expectedMax size are not null (see above), then
    // ensure that the client and server have agreed upon the exact same
    // values.
    if (expectedMinSize != null && expectedMaxSize != null) {
        isValid = isValid && (parsedMinSize === expectedMinSize.toString())
            && (parsedMaxSize === expectedMaxSize.toString());
    }

    return isValid;
}

// After the file is in S3, make sure it isn't too big.
// Omit if you don't have a max file size, or add more logic as required.
function verifyFileInS3(req, res) {
    function headReceived(err, data) {
        if (err) {
            res.status(500);
            console.log(err);
            res.end(JSON.stringify({error: "Problem querying S3!"}));
        }
        else if (data.ContentLength > expectedMaxSize) {
            res.status(400);
            res.write(JSON.stringify({error: "Too big!"}));
            deleteFile(req.body.bucket, req.body.key, function(err) {
                if (err) {
                    console.log("Couldn't delete invalid file!");
                }

                res.end();
            });
        }
        else {
            res.end();
        }
    }
    console.log(req.body);
    callS3("head", {
        Bucket: req.body.bucket,
        Key: req.body.key
    }, headReceived);
}

function getV2SignatureKey(key, stringToSign) {
    var words = CryptoJS.HmacSHA1(stringToSign, key);
    return CryptoJS.enc.Base64.stringify(words);
}

function getV4SignatureKey(key, dateStamp, regionName, serviceName, stringToSign) {
    var kDate = CryptoJS.HmacSHA256(dateStamp, "AWS4" + key),
        kRegion = CryptoJS.HmacSHA256(regionName, kDate),
        kService = CryptoJS.HmacSHA256(serviceName, kRegion),
        kSigning = CryptoJS.HmacSHA256("aws4_request", kService);

    return CryptoJS.HmacSHA256(stringToSign, kSigning).toString();
}

function deleteFile(bucket, key, callback) {
    callS3("delete", {
        bucket: bucket,
        key: key
    }, callback);
}

function callS3(type, spec, callback) {
    s3[type + "Object"]({
        Bucket: spec.bucket,
        Key: spec.key
    }, callback)
}

app.get('/', function(request, response) {
  response.render('pages/index');
});



app.listen(app.get('port'), function(){
  console.log('Listening on port: '+ PORT)
})

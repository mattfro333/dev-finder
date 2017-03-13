var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://'+process.env.SMTP_LOGIN+':'+process.env.SMTP_PASSW+'@smtp.mailgun.org');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();


if(!process.env.TEST_RECIPIENT || !process.env.TEST_SENDER || !process.env.SMTP_LOGIN || !process.env.SMTP_PASSW){
  var comments = [
      {
          "id": 1388534400000,
          "author": "You need to set details in .env for this example to work",
          "text": ""
      }
  ];
} else {
  var comments = [
      {
          "id": 1388534400000,
          "author": "None yet",
          "text": ""
      }
  ];
}

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
  res.send(comments);
});

app.post('/api/comments', function(req, res) {


  var mailOptions = {
      from: '"'+req.body.author+'" <'+process.env.TEST_SENDER+'>',
      to: process.env.TEST_RECIPIENT,
      subject: 'Test Mail',
      text: req.body.text,
      html: '<b>'+req.body.text+'</b>'
  };


  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });



  var mailDetails = {
    id: Date.now(),
    author: "From: "+req.body.author+" <"+process.env.TEST_SENDER+">, To: "+process.env.TEST_RECIPIENT,
    text: "Saying: "+req.body.text,
  };
  comments.push(mailDetails);

});

app.listen(app.get('port'), function() {
  console.log('Server started on: ' + app.get('port'));
});

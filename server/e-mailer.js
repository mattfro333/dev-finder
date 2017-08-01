// var nodemailer = require('nodemailer');
// var config = require('./config');
// var mg = require('nodemailer-mailgun-transport');
//
// var auth = {
// 	auth: {
// 		api_key: config.mg_api_key,
// 		domain: config.mg_domain
// 	}
// };
//
// var nodemailer = nodemailer.createTransport(mg(auth));
//
//
//
//
// module.exports = {
// 	sendEmail: function(req, res, next) {
// 		var mailOptions = {
// 			from: req.body.from,
// 			to: req.body.to,
// 			subject: req.body.subject,
// 			text: req.body.text
// 		};
//
// 		nodemailer.sendMail(mailOptions, function(error, info) {
// 			if (error) {
// 				console.log(error);
// 				return res.send(error);
// 			} else
// 				console.log('Message sent: ' + info);
// 			res.send(info);
// 		});
// 	}
// };

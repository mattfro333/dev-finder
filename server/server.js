//Dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const passport = require('passport');
const localAuth = require('passport-local');
//Our Modules
const config = require('./config');
//Set up App
const app = express();
app.use(bodyParser.json())
app.use(cors());
//Set up Database
const massiveInstance = massive.connectSync({
  connectionString: config.massiveUri
})
app.set('db', massiveInstance);
var db = app.get('db')
//Server
const PORT = config.port
app.listen(PORT, function(){
  console.log('Listening on port: '+ PORT)
})

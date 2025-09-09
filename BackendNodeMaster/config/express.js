var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');


const config = require('./config');
const auth = require('./auth');

module.exports = function () {
  var app = express();
  app.set('view engine', 'ejs');
  app.use(cors());
  
  app.use(cookieParser());
  
  app.use(bodyParser.urlencoded({
    limit: '5000mb',
    extended: true,
    parameterLimit:5000000000
  }));
  app.use(bodyParser.json({limit: '5000mb'}))
  app.use(bodyParser.text({limit: '5000mb'}))

  require('./passport')(passport);
  app.use(bodyParser.json());
  app.use(bodyParser.text());
  // required for passport
  app.use(session({
    secret: config.SECRET, // session secret
    resave: true,
    saveUninitialized: true
  }));
  app.use(flash()); // use connect-flash for flash messages stored in session
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  app.all("/",function(req,res,next){
    res.send("<h1>Blockcertficates server is Running</h1>")
  })

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  require('../app/routes')(app,passport,auth);
  require('../app/paymentApi')(app);

  return app;

}
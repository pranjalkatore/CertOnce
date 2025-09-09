require("dotenv").config();
var express = require('./config/express');
var server = express();
var config = require('./config/config');
var https = require('https');
var http = require('http');
var fs = require('fs');
// require('./config/mailer')();


//server.listen(config.port)
http.createServer(server).listen(config.port);
console.log("Your Http Port Number:"+config.port)
// Create an HTTPS service identical to the HTTP service.
try { 
  var options = {
    key: fs.readFileSync('/etc/apache2/ssl/private/apache-selfsigned.key'),
    cert: fs.readFileSync('/etc/apache2/ssl/apache-selfsigned.crt')
  };
  https.createServer(options, server).listen(config.https_port);
} catch (err) {
     console.log("Https running are failed!") 
}

console.log("Your Https Port Number:"+config.https_port)


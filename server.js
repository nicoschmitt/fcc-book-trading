require('dotenv').config({silent: true});

var path = require('path');

var mongoose = require("mongoose");
var driver = process.env.MONGO_URI;
mongoose.connect(driver);

var express = require('express');
var sassMiddleware = require('node-sass-middleware');

var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var passport = require('passport');
var OIDCBearerStrategy = require('passport-azure-ad').BearerStrategy;
var AnonymousStrategy = require('passport-anonymous').Strategy;

app.use(passport.initialize());
passport.use(new AnonymousStrategy());
passport.use(new OIDCBearerStrategy({
  "identityMetadata": "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
  "audience": process.env.MS_APP_ID,
  "validateIssuer": false,
}, function (token, done) {
	return done(null, token, null);
}));

app.use(sassMiddleware({
    src: path.join(__dirname, "scss"),
    dest: path.join(__dirname, "client/css"),
    prefix: "/css",
    outputStyle: 'compressed',
    debug: false
}));

require('./server/routes').register(app);

app.use(express.static(path.resolve(__dirname, 'client')));

var server = {};
var env = process.env.NODE_ENV || "development";
var port = process.env.PORT || 8080;
if (env == "development") {
    console.log("Dev env, start HTTPS server");
    var fs = require('fs');
    var https = require('https');
    var options = {
        key  : fs.readFileSync('./certs/dev.cert.key'),
        cert : fs.readFileSync('./certs/dev.cert.crt')
    };
    server = https.createServer(options, app);
    port = 443;
} else {
    var http = require('http');
    server = http.createServer(app);
}

server.listen(port, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
});
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      logger = require('morgan'),
      methodOverride = require('method-override'),
      expressJWT = require('express-jwt'),
      jwt = require('jsonwebtoken');

require('dotenv').config();
require('locus');

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressJWT({ secret: process.env.SECRET}).unless({path: [/auth/]}))

app.use(methodOverride('_method'))
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// routes
var users = require('./routes/users.js');
var beers = require('./routes/beers.js');
var auth = require('./routes/auth.js');
app.use('/users', users);
app.use('/beers', beers);
app.use('/auth', auth);

// start server
const port = process.env.PORT || 9001;
app.listen(port ,() => {
  console.log('The Server is on: ' + port);
});

module.exports = app;

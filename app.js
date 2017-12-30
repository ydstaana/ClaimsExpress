var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:root@ds159856.mlab.com:59856/claims')
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var api = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

//SET ROUTE FOR API
app.use('/api', api);

app.use(session({
  secret: 'claims-express',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
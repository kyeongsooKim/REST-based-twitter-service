var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookie = require('cookie');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('handlebars');
var async = require('async');
const expressHbs = require('express-handlebars');
const session = require('express-session');
const flash = require('express-flash');
const config = require('./config/secret');

var mongodb = require('./mongodb');

//create express app
var app = express();

// view engine setup
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
*/
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.secret
}));
app.use(logger('dev'));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// setup routes
var indexRouter = require('./routes/index');
var additemRouter = require('./routes/additem');
var adduserRouter = require('./routes/adduser');
var itemRouter = require('./routes/item');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var searchRouter = require('./routes/search');
var verifyRouter = require('./routes/verify');
var followRouter = require('./routes/follow');
var userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/additem', additemRouter);
app.use('/adduser', adduserRouter);
app.use('/item', itemRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/search', searchRouter);
app.use('/verify', verifyRouter);
app.use('/follow', followRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// start server
app.listen(80, () => console.log('Twitter Clone listening on port 80!'))

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');
var comments= require('./routes/comments');

var mongoose = require('mongoose');
// //测试数据是否连接上
// var db = mongoose.connection;
// db.on('error', function callback() { //监听是否有异常
//     console.log("Connection error");
// });
// db.once('open', function callback() { //监听一次打开
//     //在这里创建你的模式和模型
//     console.log('connected!');
// });
mongoose.connect('mongodb://localhost/fangzhihu') //连接本地数据库

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));//配置前端代码路径

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/questions', questions);
app.use('/comments', comments);


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

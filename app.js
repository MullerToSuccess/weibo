var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var partials = require('express-partials'); //停用
var settings = require('./setting');

//控制器C的引用
var index = require('./routes/index');//首页
var users = require('./routes/users');//用户主页
var post = require('./routes/post');//发表信息
var reg = require('./routes/reg');//用户注册
var login = require('./routes/login');//用户登录
var logout = require('./routes/logout');//用户登出
var update = require('./routes/update');//修改
var book = require('./routes/book');//爬虫
var analyse = require('./routes/analyse');//爬虫
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());//cookie解析中间件
app.use(session({//设置session
  secret:settings.cookieSecret,
  store: new MongoStore({ //将会话信息存储到数据库
    //db:settings.db
    url: 'mongodb://localhost/microblog',
    resave: false,
    saveUninitialized: false
  })
}));
app.use(flash());
app.use(partials());
app.use(express.static(path.join(__dirname, 'public')));//使用public模块

app.use(function(req,res,next){
  res.locals.user=req.session.user;
  var err = req.flash('error');
  var success = req.flash('success');
  res.locals.error = err.length ? err : null;
  res.locals.success = success.length ? success : null;
  next();
});
//路由控制
app.use('/', index);
app.use('/users', users);
app.use('/post', post);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);
app.use('/book', book);
app.use('/analyse', analyse);
app.use('/post/update', update);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

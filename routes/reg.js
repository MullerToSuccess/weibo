var express = require('express');
//var session = require('express-session');
var crypto = require('crypto');
var flash = require('connect-flash');
var router = express.Router();
var mongodb = require('../models/db.js');
var User = require('../models/user.js');
router.get('/',checkNotLogin);
router.get('/', function(req, res, next) {
    res.render('reg', {title: '用户注册'})
    console.log(req.session.cookie);
});
//doreg
router.post('/',checkNotLogin);
router.post('/', function(req, res, next) {
    if(req.body['password'] != req.body['password-re']){
        req.flash('error','两次输入不一致');
        console.log('not repeat ok');
        return res.redirect('/');//重定向
    }
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var newUser = new User({
        name: req.body.username,
        password: password
    });
    User.get(newUser.name, function(err, user){
        if(user){
            err='该用户已存在'
        }
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        console.log(newUser);
        newUser.save(function(err){
            if(err){
                req.flash('error', err);
                res.redirect('/');
            }
            req.session.user = newUser;
            req.flash('success', '注册成功');
            res.redirect('/');
        })
    })
});
function checkNotLogin(req, res,next){
    if(req.session.user){
        req.flash('error','已登录');
        res.redirect('/');
    }
    next();
}
module.exports = router;

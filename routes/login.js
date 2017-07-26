/**
 * Created by XZH-CD on 2017/2/14.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mongodb = require('../models/db.js');
var User = require('../models/user.js');

router.get('/',checkNotLogin);
router.get('/', function(req, res, next) {
    res.render('login',{title:'用户登入'})
});
//dologin
router.post('/',checkNotLogin);
router.post('/', function(req, res, next) {
    var md5=crypto.createHash('md5'),
        password=md5.update(req.body.password).digest('base64');//md5加密base64编码
    User.get(req.body.username, function(err, user){
        if(!user){
            req.flash('error','用户不存在');
            return res.redirect('/login')
        }
        console.log(password);
        console.log(user.password);
        if(user.password != password){
            req.flash('error','用户密码错误');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success','登录成功');
        res.redirect('/u/'+ user.name);
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
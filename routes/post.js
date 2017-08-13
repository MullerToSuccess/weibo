/**
 * Created by XZH-CD on 2017/2/14.
 */
var express = require('express');
var router = express.Router();
var mongodb = require('../models/db.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');
router.post('/', checkLogin);
router.post('/', function(req, res, next) { 
    var currentUser = req.session.user; //获取当前用户信息
    var post = new Post(currentUser.name, req.body.post);
    var up = req.body.up;
    console.log('11111111',up);
    console.log(currentUser);
    post.save(function(err){
        if(err){
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success','发表成功');
        res.redirect('/u/'+ currentUser.name);
    });
});
router.post('/post/update', function(req, res, next){
    console.log('up!');
});
function checkLogin(req, res,next){
    if(!req.session.user){
        req.flash('error','未登录');
        res.redirect('/login');
    }
    next();
}
module.exports = router;
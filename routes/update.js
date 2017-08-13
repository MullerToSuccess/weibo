var express = require('express');
var router = express.Router();
var mongodb = require('../models/db.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');
router.post('/', checkLogin);
router.post('/', function(req, res, next) {
    console.log('test update');
    var currentUser = req.session.user; //获取当前用户信息
    // var post = new Post(currentUser.name, req.body.post);
    console.log(req.body);
    // console.log(currentUser);
    // post.save(function(err){
    //     if(err){
    //         req.flash('error', err);
    //         return res.redirect('/');
    //     }
    //     req.flash('success','发表成功');
    //     res.redirect('/u/'+ currentUser.name);
    // });
    console.log(currentUser);
    mongodb.open(function(err, db){
        if(err){
            // return callback(err);
            console.log(err);
        }
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                // return callback(err);
            }
            //todo 修改某个用户的post
            collection.update({'user':currentUser.name},{$set:{'up':100}});
        })
        mongodb.close();
    });
    req.flash('success','修改成功!');
    res.redirect('/u/'+ currentUser.name);
});
function checkLogin(req, res,next){
    if(!req.session.user){
        req.flash('error','未登录');
        res.redirect('/login');
    }
    next();
}
module.exports = router;
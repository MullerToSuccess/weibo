var express = require('express');
var router = express.Router();
var mongodb = require('../models/db.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');

//All router control
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '首页', userName:"贾柯" });
});
router.get('/u/:user', function(req, res){
  User.get(req.params.user, function(err, user){
    if(!user){
      req.flash('error','ÓÃ»§²»´æÔÚ');
      return res.redirect('/');
    }
    // Post.get(user.name, function(err, posts){
    //   if(err){
    //     req.flash('error',err);
    //     return res.redirect('/');
    //   }
    //   res.render('user',{
    //     title: user.name,
    //     posts: posts
    //   })
    // });
    Post.getAll(function(err, posts){//获取所有的posts
      if(err){
        req.flash('error',err);
        return res.redirect('/');
      }
      res.render('user',{
        title: user.name,
        posts: posts
      })
    })
  })
});

module.exports = router;

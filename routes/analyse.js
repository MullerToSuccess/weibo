var express = require('express');
var superAgent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');
var router = express.Router();
var mongodb = require('../models/db.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');
// router.get('/', checkLogin);
router.get('/', function(req, res, next) {
    // console.log('crawling....');
    res.render('analyse',{data: 1});
});
module.exports = router;
var express = require('express');
var superAgent = require('superagent');
var cheerio = require('cheerio');
var router = express.Router();
var mongodb = require('../models/db.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');
router.get('/', checkLogin);
router.get('/', function(req, res, next) {
    console.log('crawling....');
    var url = 'https://cnodejs.org';
    var items = [];
    superAgent
        .get(url)
        .set({
            Referer: url,
            'User-Agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
        })
        .end(function (err, response) {
            if (err) {
                console.log(err.status);
                return false;
            }
            // 如果真的出错了,那么response将会是undefined,这时候访问status属性会出错,所以还是
            // 得有上面代码的错误检查
            if (response.status === 200) {
                var $ = cheerio.load(response.text);
            }
            $('#topic_list .cell').each(function (index, item) {
                var $item = $(item);
                // 每一篇文章的url
                var itemURL = url + $item.find('.topic_title').attr('href');
                var author = $item.find('.user_avatar > img').attr('title');
                var title = $item.find('.topic_title').attr('title');
                items.push({
                    title: title,
                    href: itemURL,
                    author: author
                });
            });
            if (items) {
                //存入mongodb:
                mongodb.open(function(err, db){
                    if(err){
                        return callback(err);
                    }
                    console.log('db connect ok.');
                    db.collection('cnode', function(err, collection){
                        if(err){
                            mongodb.close();
                        }
                        if(!collection){
                            collection.insert(items);
                        }else{
                            console.log('数据库已经存在数据.');
                            //render到视图.
                            res.render('crawl',{items: items});
                            mongodb.close();
                        }

                    })
                })
            }
        });
    // res.json({user:'jiake'});//后端返回json
    // res.render('crawl', { title: 'Crawl', userName:"贾柯" });
});
function checkLogin(req, res,next){
    if(!req.session.user){
        req.flash('error','未登录');
        res.redirect('/login');
    }
    next();
}
module.exports = router;
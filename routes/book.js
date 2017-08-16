var express = require('express');
var superAgent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');
var router = express.Router();
var mongodb = require('../models/db.js');
var User = require('../models/user.js');
var Post = require('../models/post.js');
router.get('/', checkLogin);
router.get('/', function(req, res, next) {
    console.log('crawling....');
    // var url = 'https://cnodejs.org';
    // var url = 'https://book.douban.com/tag/%E5%B0%8F%E8%AF%B4';
    // var items = [];
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        console.log('db connect ok.');
        db.collection('books', function(err, collection){
            if(err){
                mongodb.close();
            }
            // collection.insert(items);//插入数据库
            collection.find().toArray(function (err, docs) {
                console.log(docs.length);
                if(!docs.length){
                    console.log('不存在数据,插入');
                    res.render('book',{movies: items});//空
                    // mongodb.close();
                }else{
                    console.log('数据库已经存在数据.');
                    //render到视图.
                    res.render('book',{movies: docs});
                    // mongodb.close();
                }
            });
            mongodb.close();
            // if(!collection){
            //     collection.insert(items);
            // }else{
            //     console.log('数据库已经存在数据.');
            //     //render到视图.
            //     res.render('crawl',{items: items});
            //     mongodb.close();
            //     // fs.readdir("./public/images/", function (err, files) {//读取文件夹下文件
            //     //     var count = files.length,
            //     //         results =new Array() ;
            //     //
            //     //     files.forEach(function (filename) {
            //     //         fs.readFile(filename, function (data) {
            //     //             var tmpResult={};
            //     //             tmpResult["imageName"]=filename;
            //     //             tmpResult["imagePath"] = "./public/images/"+filename;
            //     //             results[count-1]=tmpResult ;
            //     //             count--;
            //     //             if (count <= 0) {
            //     //                 console.log(results);
            //     //                 res.send(results);
            //     //                 res.end();//向客户端传送服务器图片信息（json数据格式）
            //     //             }
            //     //         });
            //     //     });
            //     // });
            // }
        })
    })
    // superAgent
    //     .get(url)
    //     .set({
    //         Referer: url,
    //         'User-Agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
    //     })
    //     .end(function (err, response) {
    //         if (err) {
    //             console.log(err.status);
    //             return false;
    //         }
    //         // 如果真的出错了,那么response将会是undefined,这时候访问status属性会出错,所以还是
    //         // 得有上面代码的错误检查
    //         if (response.status === 200) {
    //             var $ = cheerio.load(response.text);
    //         }
    //         // $('#topic_list .cell').each(function (index, item) {
    //         $('.subject-item').each(function (index, item) {
    //             var $item = $(item);
    //             console.log($item);
    //             // 每一篇文章的url
    //             // var itemURL = url + $item.find('.topic_title').attr('href');
    //             // var author = $item.find('.user_avatar > img').attr('title');
    //             // var title = $item.find('.topic_title').attr('title');
    //             // var src = $item.find('.user_avatar > img').attr('src');
    //             // items.push({
    //             //     title: title,
    //             //     href: itemURL,
    //             //     author: author,
    //             //     src:src
    //             // });
    //             var movieSrc = $item.find('img').attr('src');
    //             var movieName = $item.find('h2>a').attr('title');
    //             var infoSrc = $item.find('h2>a').attr('href');
    //             var bookId = (infoSrc.split('/'))[4];
    //             items.push({
    //                 src:movieSrc,
    //                 name:movieName,
    //                 infoSrc: infoSrc,
    //                 id:bookId
    //             });
    //         });
    //         if (items) {
    //             //存入mongodb:
    //             mongodb.open(function(err, db){
    //                 if(err){
    //                     return callback(err);
    //                 }
    //                 console.log('db connect ok.');
    //                 db.collection('books', function(err, collection){
    //                     if(err){
    //                         mongodb.close();
    //                     }
    //                     // collection.insert(items);//插入数据库
    //                     collection.find().toArray(function (err, docs) {
    //                         console.log(docs.length);
    //                         if(!docs.length){
    //                             console.log('不存在数据,插入');
    //                             res.render('book',{movies: items});
    //                             // mongodb.close();
    //                         }else{
    //                             console.log('数据库已经存在数据.');
    //                             //render到视图.
    //                             res.render('book',{movies: docs});
    //                             // mongodb.close();
    //                         }
    //                     });
    //                     mongodb.close();
    //                     // if(!collection){
    //                     //     collection.insert(items);
    //                     // }else{
    //                     //     console.log('数据库已经存在数据.');
    //                     //     //render到视图.
    //                     //     res.render('crawl',{items: items});
    //                     //     mongodb.close();
    //                     //     // fs.readdir("./public/images/", function (err, files) {//读取文件夹下文件
    //                     //     //     var count = files.length,
    //                     //     //         results =new Array() ;
    //                     //     //
    //                     //     //     files.forEach(function (filename) {
    //                     //     //         fs.readFile(filename, function (data) {
    //                     //     //             var tmpResult={};
    //                     //     //             tmpResult["imageName"]=filename;
    //                     //     //             tmpResult["imagePath"] = "./public/images/"+filename;
    //                     //     //             results[count-1]=tmpResult ;
    //                     //     //             count--;
    //                     //     //             if (count <= 0) {
    //                     //     //                 console.log(results);
    //                     //     //                 res.send(results);
    //                     //     //                 res.end();//向客户端传送服务器图片信息（json数据格式）
    //                     //     //             }
    //                     //     //         });
    //                     //     //     });
    //                     //     // });
    //                     // }
    //                 })
    //             })
    //         }
    //     });
    // res.json({user:'jiake'});//后端返回json
    // res.render('crawl', { title: 'Crawl', userName:"贾柯" });
});
// router.get('/info/', function(req, res, next){
//     res.render('info');
//
// });
router.get('/:name', function(req, res, next){
    var bookname = req.params.name;
    console.log('书名:',bookname);
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        console.log('db connect ok.');
        db.collection('books', function(err, collection){
            if(err){
                mongodb.close();
            }
            //按书名查找数据库:
            collection.find({name:bookname}).toArray(function (err, docs) {
                if(docs){
                    console.log('有此书.');
                    //find more info for this book.
                    // var subUrl = docs[0].infoSrc
                    var subUrl = 'https://api.douban.com/v2/book/' + docs[0].infoSrc.split('/')[4];
                    console.log(subUrl);
                    superAgent
                        .get(subUrl)
                        .set({
                            Referer: subUrl,
                            'User-Agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0"
                        })
                        .end(function(err, response){
                            if(err){
                                console.log(err.status);
                                return false;
                            }
                            console.log(response.body);
                            var bookJson = response.body;
                            res.render('info', {book: bookJson});
                            // res.send(response.body);
                            // if (response.status === 200) {
                            //     var $ = cheerio.load(response.text);
                            // }
                            // res.render('info', {intros:response,books:docs});
                            //获取dom
                            // var bookInfo = [];
                            // var $intro = $('.related_info');
                            // var intro_content = $intro.find('.intro').eq(0).text();
                            // var intro_author = $intro.find('.intro').eq(1).text();
                            // bookInfo.push({
                            //     content: intro_content,
                            //     author: intro_author
                            // });
                            // console.log(bookInfo);
                            // if(bookInfo){
                            //     res.render('info', {intros:bookInfo[0],books:docs});
                            // }
                        })
                }
            });
            mongodb.close()
        })
    })
});
router.get('/vote', function(req, res, next){
    res.render('vote');
    superAgent.get('/v2/book/:id')
});
function checkLogin(req, res,next){
    if(!req.session.user){
        req.flash('error','未登录');
        res.redirect('/login');
    }
    next();
}
module.exports = router;
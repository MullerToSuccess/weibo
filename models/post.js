/**
 * Created by XZH-CD on 2017/2/16.
 */
var mongodb = require('./db');

function Post(username, post, time, up){
    this.user = username;//用户名
    this.post = post;//发表内容
    this.up = up;
    if(time){
        this.time = time;
    }else{
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        this.time = year+' 年 '+ month + ' 月 '+day+ ' 日 ' + hour + ' 点 '+ min+'  分';
    };

}
Post.prototype.save = function save(callback){
    var post = {
        user: this.user,
        post: this.post,
        time: this.time,
        up: this.up
    };
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('user');
            //写入文档
            collection.insert(post,{safe: true}, function(err, post){
                mongodb.close();
                callback(err,post);
            })
        })
    })
};
Post.get = function get(username, callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if(username){
                query.user = username;
            }
            collection.find(query).sort({time:-1}).toArray(function(err, docs){
                mongodb.close();//断开连接
                if(err){
                    callback(err, null);
                }
                var posts = [];
                docs.forEach((function(doc, index){
                    var post = new Post(doc.user, doc.post, doc.time, doc.up);
                    posts.push(post);
                }));
                callback(null, posts);
            })
        })
    })
}
Post.getAll = function getAll(callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.find().toArray(function(err, docs){
                mongodb.close();
                if(err){
                    callback(err, null);
                }
                var posts = [];
                docs.forEach((function(doc, index){
                    var post = new Post(doc.user, doc.post, doc.time, doc.up);
                    posts.push(post);
                }));
                callback(null, posts);
            })

        })
    })
}
Post.update = function update(callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection('posts', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //todo 修改某个用户的post
            collection.find().toArray(function(err, docs){
                mongodb.close();
                if(err){
                    callback(err, null);
                }
                var posts = [];
                docs.forEach((function(doc, index){
                    var post = new Post(doc.user, doc.post, doc.time, doc.up);
                    posts.push(post);
                }));
                callback(null, posts);
            })

        })
    })
}
module.exports = Post;
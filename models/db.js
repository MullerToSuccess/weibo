/**
 * Created by XZH-CD on 2017/2/14.
 */
var settings = require('../setting');
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, 27017,{}));
//输出创建的数据库连接

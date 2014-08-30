/**
 * New node file
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dburl = require("../config").db;//数据库地址

exports.connect = function(callback) {
    mongoose.connect(dburl);
}

exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}

exports.setup = function(callback) { callback(null); }
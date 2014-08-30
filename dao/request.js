/**
 * New node file
 */



var mongoose = require('mongoose')
, Schema = mongoose.Schema
, KeyValueEntityHelper=require("./KeyValueEntityHelper");



var schema = Schema({
//_id     : Number,
name    : String,
value	: String
});
var Model=mongoose.model('Request', schema);
exports.model= Model;


KeyValueEntityHelper.wrapModel(Model,exports);
/**
 * New node file
 */

var mongoose = require('mongoose')
, Schema = mongoose.Schema
, KeyValueEntityHelper=require("./KeyValueEntityHelper");


var orginSchema = Schema({
//_id     : Number,
name    : String,
value	: String
});
var Model=mongoose.model('Orgin', orginSchema);
exports.model= Model;


KeyValueEntityHelper.wrapModel(Model,exports);
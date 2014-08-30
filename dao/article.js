/**
 * New node file
 */

 var mongoose = require('mongoose')
 , Schema = mongoose.Schema


 var schema = Schema({
	//_id     : Number,
	title    : String,  
	content : String,
	time     : {type : Date, default: Date.now}
	
});
 var Model=mongoose.model('article', schema);
 exports.model= Model;

exports.info=function(id,callback){
	Model.findById(id,function(err,doc){
		if(err){
			return callback(err);
		}
		callback(null,doc);
	});
};  

exports.update=function(id,title,content,callback){


	var conditions = {_id : id};

	var update     = {$set : {title : title, content : content}};

	var options    = {upsert : true};

	Model.update(conditions, update, options, callback);

};

exports.del=function(id,callback){
		Model.remove({_id:id},callback);
}

exports.list=function(callback){
	Model.find({},callback);
};

 exports.add=function(nameParam,valueParam,callback){
 	var model=new Model({title:nameParam,content:valueParam,time:Date.now()});
 	model.save(function(err){
 		if(err){
 			return callback(err);
 		}
 		callback(null,model);
 	});
 };



 
var mongoose = require('mongoose')
, Schema = mongoose.Schema;


var schema = Schema({
//_id     : Number,
name    : String,
password	: String,
time     : {type : Date, default: Date.now}
});
var Model=mongoose.model('user', schema);
exports.model= Model;

exports.getUserBy=function (name,password,callback) {
	Model.findOne({name:name,password:password},callback);
	// body...
};

exports.isExist=function(name,callback){
	Model.findOne({name:name},callback);
};

exports.getList=function(callback){
	Model.find({},callback);
};

exports.findById=function(id,callback){
	Model.findById(id,callback);
};	

exports.update=function(id,name,password,callback){
	Model.update({_id:id},{$set:{name:name,password:password}},callback);
};

 

exports.addUser=function(name,password,callback){

	exports.isExist(name,function(err,doc){
		if(err){
			callback(err,null);
			return ;
		}
		else if(doc){
			callback(new Error('己经存在'),null);
			return ;
		}
		var user=new Model({name:name,password:password});
		user.save(callback);
	});

	
};



exports.delete=function(id,callback){
	Model.remove({_id:id},callback);
};




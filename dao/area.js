/**
 * New node file
 */

var mongoose = require('mongoose')
, Schema = mongoose.Schema;


var schema = Schema({
	//_id     : Number,
	name    : String,
	value	: String,
	parent	:{ type: Schema.Types.ObjectId, ref: 'area' }
	});
	var Model=mongoose.model('area', schema);
	exports.model= Model;

	exports.add=function(nameParam,valueParam,parentId,callback){
		var model=new Model({name:nameParam,value:valueParam,parent:parentId});
		model.save(function(err){
			if(err){
				return callback(err);
			}
			callback(null,model);
		});
	};


	exports.findById=function(id,callback){
		Model.findOne().where({_id:id}).populate('parent').exec(callback);
	}

	exports.getParentAreas=function(callback){
		Model.find().or({parent:"",parent:null}).exec(function(err,docs){
			if(err){
				console.log(err);
				callback([]);
			}
			else{
				callback(docs);
			}
		});
	};


	exports.getChildAreasByParentId=function(id,callback){
		Model.find({parent:id},function(err,docs){
			if(err){
				callback([]);
				return;
			}
			else{
				callback(docs);
			}
		});
	}

	exports.del=function(id,callback){
		Model.remove({_id:id},callback);
	};

	exports.update=function(id,options,callback){
		Model.update({_id:id},{$set:options},callback);
	}






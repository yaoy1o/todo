
exports.wrapModel=function(Model,exports){
	exports.add=function(nameParam,valueParam,callback){
	var model=new Model({name:nameParam,value:valueParam});
		model.save(callback);
	};


	exports.update=function(id,options,callback){
		Model.update({_id:id},{$set:options},callback);
	};


	exports.delete=function(id,callback){
		Model.remove({_id:id},callback);
	};

	exports.findById=function(id,callback){
		// Model.findById({_id:id},callback);

		Model.findOne().where({_id:id}).exec(callback);
	};

	exports.list=function(callback){
		Model.find({},callback);
	}
};



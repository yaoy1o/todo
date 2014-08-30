/**
 * New node file
 */
var mongoose = require('mongoose')
, Schema = mongoose.Schema
 
 

var personSchema = Schema({ 
//_id     : Number,   
name    : String,
age     : Number, 
stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }],
orgin : { type: Schema.Types.ObjectId, ref: 'Orgin' },
area : { type: Schema.Types.ObjectId, ref: 'area' }, 
huxing : { type: Schema.Types.ObjectId, ref: 'Huxing' },
mj : { type: Schema.Types.ObjectId, ref: 'Mj' },
price : { type: Schema.Types.ObjectId, ref: 'Price' },
request : { type: Schema.Types.ObjectId, ref: 'Request' },
time : {type:Date,default:Date.now}
});

personSchema.methods.toName = function(obj){
    if(obj && obj.name){
        return obj.name;
    }
    else{
        return "无";
    }
};

var storySchema = Schema({
_creator : { type: Schema.Types.ObjectId, ref: 'Person' },
title    : String,
fans     : [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);




exports.getById=function(id,callback){
	Person.findById(id).populate('stories').populate('orgin').populate('huxing').populate('mj').populate('request').populate('price')
	.populate('area')
	.exec(function(err,doc){
		if(err){
			console.log(err);
			callback(err,null);

			return;
		}

		if(doc.area && doc.area.parent){
				var myArea=require('./area');
				myArea.model.findById(doc.area.parent).exec(function(err,parentArea){
					if(err){
						console.log(err);
						callback(err,null);
						return;
					}
					doc.parentArea=parentArea;
				});
		}

		callback(null,doc);
		

	});
};


exports.info=function(id,callback){
	Person.findOne({_id:id}).populate('stories').populate('orgin').populate('huxing').populate('mj').populate('request').populate('price')
	.populate('area').exec(function(err,doc){
		if(err){
			callback(err);
			return;
		}
		var id=null;

		if(doc.area){
			id=doc.area.parent;
			
		}

		var myArea=require('./area');

		myArea.model.findById({_id:id},function(err,parentArea){
			if(err){
				console.log(err);
				callback(err,null);
				return;
			}

			console.log('parentArea is'+ parentArea);

			doc.parentArea = parentArea;

			console.log('doc is'+doc.parentArea);
			callback(null,doc);
		});



	});
};

exports.list=function(args,callback){

 // .where('name.last').equals('Ghost')
 //      .where('age').gt(17).lt(66)
 //      .where('likes').in(['vaporizing', 'talking'])
 //      .limit(10)
 //      .sort('-occupation')
 //      .select('name occupation')
 	if(!args){
 		args={
 			pageindex:0,
 			pagesize:0
 		};
 	}

 	console.log("pageskip:"+args.pageindex*args.pagesize);
 	console.log("pagesize:"+args.pagesize);
	Person.find({}).populate('stories').populate('orgin').populate('huxing').populate('mj').populate('request').populate('price')
	.populate('area')
	.limit(args.pagesize)
	.skip(args.pageindex*args.pagesize)
    .sort('-time')
	.exec(function(err,docs){
		if(err){
			console.log(err);
			callback(err,null);

			return;
		}
		var areas=[];

		for(var i=0;i<docs.length;i++){
			var doc =docs[i];
			var id=null;

			if(doc.area){
				id=doc.area.parent;
				
			}
			 
			areas.push(id);

		}
		var myArea=require('./area');
		console.log('areas is'+areas);
		myArea.model.find().where('_id').in(areas).exec(function(err,parentAreas){
			if(err){
				console.log(err);
				callback(err,null);
				return;
			}

			for(var i=0;i<docs.length;i++){
				docs[i].parentArea=parentAreas[i];
			}
			callback(null,docs);
		});

	});
};


exports.delete=function(id,callback){
	Person.remove({_id:id},callback);
};


exports.allCount=function(callback){
	Person.count({},callback);
}

exports.create = function(personName,personAge,orgin,huxing,mj,price,request,storyTitle,parentArea,childArea,callback){
	var area=parentArea;

	if(childArea){
		area=childArea;
	}



	var person = new Person({ name: personName, age: personAge ,orgin:orgin,huxing:huxing,mj:mj,price:price,request:request,area:area});
	person.save(function (err) {
		  if (err) {
			   console.log(err);
			   callback(err);
			   return ;
		  }
		  
		  var story1 = new Story({
		    title: storyTitle,
		    _creator: person._id    // assign the _id from the person
		  });
		  
		  story1.save(function (err) {
		    if (err) {
		    	 console.log(err);
		    	 callback(err);
		    	 return ;
		    }
		    
		    person.stories.push(story1);
		    person.save(function(err){
		    	 if (err) {
					   console.log(err);
					   callback(err);
					   return ;
				  }
		    	 callback(null,person);
		    });
		    // thats it!
		  });
		})
};

exports.isExist=function(name,callback){
	Person.findOne({name:name},callback);
};

exports.update = function(id,personName,personAge,orgin,huxing,mj,price,request,storyTitle,parentArea,childArea,callback){
	var area=parentArea;

	if(childArea){
		area=childArea;
	}

	Person.update({_id:id},{$set:{ name: personName, age: personAge ,orgin:orgin,huxing:huxing,mj:mj,price:price,request:request,area:area}},callback);

};




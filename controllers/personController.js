var person=require('../dao/person');  
var async=require('async'); 




exports.personIndex=function(req,res,next){ 
	res.render('personIndex.html',{title:'个人中心'});
};  

exports.info=function(req,res,next){
	var id=req.param('id');
	if(!id){
		res.json({code:'0001',message:'id is empty!'});
		return;
	}

	person.info(id,function(err,doc){
		if(err){
			res.json({code:'0000',message:err});
			return;
		}
		res.json({code:'0000',data:doc});
		

	});
};

 
exports.isExist=function(req,res,next){

	person.isExist(req.param('personName'),function(err,doc){
		if(err){
			res.json({isUnique:false}); 
			return;
		}

		if(doc){
			res.json({isUnique:false}); 
			return;
		}

		res.json({isUnique:true});

	});


	



};   
 
exports.personlistView=function(req,res,next){    
	
 
	var pagesize=req.param('pagesize');  
	if(!pagesize){ 
		pagesize=5;
	}  
	var pageindex=req.param('pageindex');
	if(!pageindex){  
		pageindex=0;
	} 




	person.allCount(function(err,count){   
		if(err){ 
			res.render('error.html',{message:err});          
			return ;    
		}    

		person.list({pagesize:pagesize,pageindex:pageindex} ,function(err,persons){       
			   
			if(err){  
				res.render('error.html',{message:err});
				return ;   
			} 	   
			console.log("persons is:"+persons);

			var pageCount=Math.ceil(count/pagesize);
			 
			console.log('pageCount:'+pageCount);
			res.render('personlist.html',{title:"私客列表",todos:persons,count:count,pageCount:pageCount,pageindex:pageindex,pagesize:pagesize});
		
		}); 
   
	});   
  
	
	    
};


exports.delete=function(req,res,next){
	var id=req.param('id');
	if(!id){
		res.render('error.html',{message:'id is empty!'});
		return;
	}
	person.delete(id,function(err){
		if(err){
			res.render('error.html',{message:err});
			return;
		}
		res.redirect('/person/listView');
	});
};

exports.editView=exports.addView=function(req,res,next){

		// var orgins;
		// var mjs; 
		// var prices;
		// var requests;
		// var huxings; 

		var id=req.param('id');

		
		var title='添加私客';

		if(id){ 
			title='修改私客';
		}

		var getPerson=function(callback){
			if(id){
				person.getById(id,callback);
			}
			else{
				callback(null,{});
			}
		};



		var getOrgin=function(callback){
			var Model=require('../dao/orgin'); 
			Model.model.find({},callback);
		};


		var getMj=function(callback){
			var Model=require('../dao/mj');  	
			
			Model.model.find({},callback);
		};



		var getHuxing=function(callback){
				var Model=require('../dao/huxing');  
					
				Model.model.find({},callback);
		};

		var getPrice=function(callback){
				var Model=require('../dao/price');
					
					Model.model.find({},callback);
		};

		var  getRequest=function(callback){
					var Model=require('../dao/request');
						 
						Model.model.find({},callback);
		};

		var getParentAreas=function(callback){
					var Model=require('../dao/area');
					Model.getParentAreas(function(docs){
						callback(null,docs);
					});
		};


		 
		 async.parallel({
			    orgins:getOrgin,
			    huxings:getHuxing,
			    mjs:getMj,
			    prices:getPrice,
			    requests:getRequest,
			    parentAreas:getParentAreas,
			    doc:getPerson
			}, function (err, results) {
				if(err){
					 res.render('error.html',{message:err});  
					 return;
				}
			   
			    console.log('1.1 results: ', results); // ->[ 'a400', 'a200', 'a300' ]

			    res.render('personadd.html',{title:title,orgins:results.orgins,prices:results.prices,mjs:results.mjs,huxings:results.huxings,requests:results.requests,parentAreas:results.parentAreas,childAreas:[],doc:results.doc});
						
  
			});



		// var Model=require('../dao/orgin'); 
		// Model.model.find({},function(err,docs){
		// 	if(err){ 
		// 		res.render('error.html',{message:err}); 
		// 		return ;
		// 	}
		// 	orgins=docs;
		 
		// 	var Model=require('../dao/mj');  	
			
		// 	Model.model.find({},function(err,docs){
		// 		if(err){
		// 			res.render('error.html',{message:err});
		// 			return ;
		// 		}                
		// 		mjs=docs;
			 
		// 		var Model=require('../dao/huxing');  
					
		// 		Model.model.find({},function(err,docs){
		// 			if(err){
		// 				res.render('error.html',{message:err});
		// 				return ;
		// 			}
		// 			huxings=docs;
				 
		// 			var Model=require('../dao/price');
					
		// 			Model.model.find({},function(err,docs){
		// 				if(err){
		// 					res.render('error.html',{message:err});
		// 					return ;
		// 				} 
		// 				prices=docs;  
					
		// 				var Model=require('../dao/request');
						 
		// 				Model.model.find({},function(err,docs){
		// 					if(err){
		// 						res.render('error.html',{message:err});
		// 						return ;
		// 					}
		// 					requests=docs;
							
		// 					res.render('personadd.html',{title:"添加私客",orgins:orgins,prices:prices,mjs:mjs,huxings:huxings,requests:requests});
						
							
		// 				});
						
		// 			});
		// 		});
		// 	});
		// });
	 
};


exports.createOrUpdate=function(req,res,next){
	
	var id=req.param('id');

	if(id){
		person.update(id,req.body.personName,req.body.personAge,req.body.orgin,req.body.huxing,req.body.mj,req.body.price,req.body.request,req.body.storyTitle,req.body.parentArea,req.body.childArea,function(err){
			if(err){
				return res.render('error.html',{message:err});
			}
			res.redirect('/person/listView');
		});
	}
	else{
		person.create(req.body.personName,req.body.personAge,req.body.orgin,req.body.huxing,req.body.mj,req.body.price,req.body.request,req.body.storyTitle,req.body.parentArea,req.body.childArea,function(err){
			if(err){
				return res.render('error.html',{message:err});
			}
			res.redirect('/person/listView');
		});
	}
	
	
	
};

exports.list=function(req,res,next){
	person.list(null,function(err,docs){
		if(err){
			res.json({code:'0001',message:err});
			return;
		}
		res.json({code:'0000',data:docs});

	});
};


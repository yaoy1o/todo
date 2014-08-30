/**
 * New node file
 */

var Model=require('../dao/area');

exports.addView=function(req,res,next){

	Model.getParentAreas(function(docs){
		res.render('areaAdd.html',{title:'area',doc:{},areas:docs,isEdit:false,action:"createOrUpdate"});
	});

	 
};

exports.editView=function(req,res,next){


	Model.getParentAreas(function(docs){
		Model.findById(req.param('id'),function(err,doc){
			if(err){
					res.render("error.html",{message:err});
					return;
			}
			res.render('areaAdd.html',{title:'area',doc:doc,areas:docs,isEdit:true,action:"../createOrUpdate"});
		});
	});

	

	 
};


exports.getParentListJson=function(req,res,next){


	Model.getParentAreas(function(docs){
		res.json(docs);
	});

 
}

exports.getChildListByParentIdJson=function(req,res,next){
	var parentId=req.param('parentId');
	if(""==parentId){
		parentId=null;
	}

	Model.getChildAreasByParentId(parentId,function(docs){
		res.json(docs);		
	});
}


exports.delete=function(req,res,next){
	var id=req.param('id');
	if(id==null){
		res.render("error.html",{message:'id is empty!'});
		return;
	}
	Model.del(id,function(err){
		if(err){
			res.render("error.html",{message:err});
			return;
		}

		res.redirect('/area/listView');

	});

};

exports.listView=function(req,res,next){
	Model.model.find().where({}).populate('parent').exec(function(err,docs){
		if(err){
			res.render('error.html',{message:err});
			return ;
		}

		var formatAreaDes=function(parentArea,childAreaName){
			if(parentArea == null ){
				return childAreaName;
			}
			else{
				return parentArea.name +"-"+childAreaName;
			}
		};
		
		res.render('arealist.html',{title:"area",preUrl:"area",todos:docs,formatAreaDes:formatAreaDes});
	});
};

exports.createOrUpdate=function(req,res,next){
	var id=req.param('id');
	var name=req.param('name');
	var value=req.param('value');
	var parentId=req.param('parent');
	if(""==parentId){
		parentId=null;
	}
	var errStr;
	if(name==null){
		errStr="name is empty";
	}
	else if(value==null){
		errStr="value is empty";
	}
	if(errStr!=null){
		return res.render('error.html',{message:errStr});
	}
	if(id && id!=""){
		Model.update(id,{name:name,value:value,parent:parentId},function(err){
			if(err){
				res.render('error.html',{message:err});
				return ;
			}

			res.redirect('/area/listView');

		});
	}
	else{
		Model.add(name,value,parentId,function(err,model){
			if(err){
				console.log(err);
				res.render('error.html',{message:err});
				return ;
			}
			console.log(model);
			res.render('success.html',{message:"_id is:"+model._id+",name is:"+name+",value is:"+value+",parentId is:"+parentId});
		});
	}
	
	 
};
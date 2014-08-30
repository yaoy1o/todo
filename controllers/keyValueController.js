/**
 * New node file
 */





exports.wrapController=function(options){


		var exports=options.exports;
		var Model=options.Model;
		var title=options.title;
		var preUrl=options.preUrl;
		exports.addView=function(req,res,next){
			res.render('keyValueAdd.html',{title:'添加',isEdit:false,doc:{},action:'createOrUpdate'});
		};

		exports.list=function(req,res,next){
			Model.list(function(err,docs){
				if(err){
					res.json({code:'0001',message:err});
					return;
				}
				res.json({code:'0000',data:docs});
				
			});
		};




		exports.editView=function(req,res,next){
			var id=req.param('id');
			if(id==null || id ==""){
				res.render("error.html",{message:'id is empty!'});
				return;
			}

			Model.findById(id,function(err,doc){
				if(err){
					res.render('error.html',{message:err});
					return;
				}

				res.render('keyValueAdd.html',{title:'编辑',isEdit:true,doc:doc,action:'../createOrUpdate'});

			});

			
		};

		exports.listView=function(req,res,next){
			Model.list(function(err,docs){
				if(err){
					res.render('error.html',{message:err});
					return ;
				}
				
				res.render('list.html',{title:title,preUrl:preUrl,todos:docs});
			});
		};


		exports.delete=function(req,res,next){

			var id=req.param('id');
			if(id && id!=""){
				Model.delete(id,function(err){
					if(err){
						res.render('error.html',{message:err});
						return;
					}
					res.render('success.html',{message:'删除成功！',redirect:'/'+preUrl+'/list'});
					return;
				});

			}
			else{
				res.render('error.html',{message:'id is empty!'});
			}

		};


		exports.createOrUpdate=function(req,res,next){
				var id=req.param('id');
				var name=req.param('name');
				var value=req.param('value');
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
					Model.update(id,{name:name,value:value},function(err){
						if(err){
							res.render('error.html',{message:err});
							return;
						}
						res.render('success.html',{message:"更新成功"});
					});
				}else{
						Model.add(name,value,function(err){
							if(err){
								res.render('error.html',{message:err});
								return ;
							}
							res.render('success.html',{message:"name is:"+name+"value is:"+value});
						});
				}
		};


};


 

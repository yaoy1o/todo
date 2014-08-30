
var User=require('../dao/user');

exports.addView=function(req,res,next){
	res.render('addUser.html',{doc:{},action:'/user/createOrUpdate',isEdit:false,title:'新用户'})
};


exports.editView=function(req,res,next){
	var  id=req.param('id');
	if(id && id!=""){
			User.findById(id,function(err,doc){
				if(err){
					res.render("error.html",{message:err});
					return;
				}
				if(doc){
					res.render('addUser.html',{doc:doc,action:'/user/createOrUpdate',isEdit:true,title:'更改用户'})

				}
				
			});
	}
	else{
		res.render("error.html",{message:'id is empty!'});
		return;
	}

};

exports.list=function(req,res,next){
	User.getList(function(err,docs){
		if(err){
			res.json({code:'0001',message:err});
			return;
		}
		res.json({code:'0000',data:docs});

	});
};

exports.listView=function(req,res,next){
	User.getList(function(err,docs){
		if(err){
			res.render('error.html',{message:err});
			return;
		}
		res.render('userlist.html',{title:'用户',todos:docs,preUrl:'user'})
	});
};


exports.delete=function(req,res,next){

	var id=req.param('id');
	if(id && id!=""){
		User.delete(id,function(err){
			if(err){
				res.render('error.html',{message:err});
				return;
			}
			res.render('success.html',{message:'删除成功！',redirect:'/user/listView'});
			return;
		});

	}
	else{
		res.render('error.html',{message:'id is empty!'});
	}

};

exports.createOrUpdate=function(req,res,next){
	var id=req.param('id');
	var username=req.param('name');
	var password=req.param('password');



	if(!username && username==""){
		res.render('error.html',{message:'username is empty!'});
		return;
	}
	else if(!password && password==""){
		res.render('error.html',{message:'password is empty!'});
		return;
	}
	else{
		if(id && id!=""){

				User.update(id,username,password,function(err){
					if(err){
						res.render('error.html',{message:err});
						return;
					}
					res.redirect('/user/listView');
				});

				
		}
		else{
			User.addUser(username,password,function(err,doc){
					if(err){
						res.render('error.html',{message:err});
					}
					else if(!doc){
						res.render('error.html',{message:'doc is null!'});
					}

					else{
						res.redirect('/user/listView');
					}
			});
			
		}
		
	}




	
};


	

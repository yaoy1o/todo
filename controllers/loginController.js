var User=require('../dao/user');


exports.login=function(req,res,next){
	exports._login(req,res,next,function(err,data){
		if(err){
			res.render('error.html',err);
			return;
		}
		 
		res.redirect('/person');

	});
};
exports.loginJson=function(req,res,next){
	exports._login(req,res,next,function(err,data){
		if(err){
			res.json({code:'0001',message:err.message});
			return;
		}
		 
		res.json({code:'0000',message:'success',user:data.user});

	});
};

exports._login=function(req,res,next,callback){
	var userName= req.param('userName');
	var password=req.param('password');
	var isRemember=req.param('isRemember');
	if(!userName || userName==""){

		callback({message:'name is empty!'});
		return;
	}
	else if(!password || password==""){
		callback({message:'password is empty!'});
		return;
	}else{

		User.isExist(userName,function(err,doc){
			if(err){

				callback({message:err});
				return;
			}
			else if(!doc){

				callback({message:'user is not exsit!'})
				return;
			}
			else if(doc.password != password){
				callback({message:'password is wrong!'})
				return;
			}


			console.log(doc);
			req.session.username=userName;
			req.session.user=doc;
			callback(null,{message:'success',status:true,user:doc});
			return;

		});
	}



};



exports.logout=function(req,res,next){
	req.session.username=null;
	res.redirect('/loginView');
};

exports.loginView=function(req,res,next){

	res.render('login.html',{layout:false});
};
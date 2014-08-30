/**
 * New node file
 */

var fs = require('fs');
var Model=require('../dao/GenJin');
var Person=require('../dao/person');


exports.list=function(req,res,next){
	Model.list(function(err,docs){
		if(err){
			res.json({code:'0001',message:err});
			return;
		}
		res.json({code:'0000',data:docs});
		
	});
};

exports.personAddGenJin=function(req,res,next){
	var genJinContent=req.param('genJinContent');
	var personId=req.param('personId');
	if(!personId){
		res.render('error.html',{message:'personId is empty!'});
		return;
	}
	if(!genJinContent){
		res.render('error.html',{message:'content is empty!'});
		return;

	}

	Model.add(personId,genJinContent,function(err){
		if(err){
			res.json({code:'0001',message:err});
			return;
		}

		res.json({code:'0000',message:'success'});

	});



};

exports.infoView=function(req,res,next){
	Model.info(req.param('id'),function(err,docItem){
		if(err){
			res.render('error.html',{message:err});
			return ;
		}
		console.log(docItem);
		res.render('articleinfo.html',{doc:docItem});
	});
};


exports.editView=function(req,res,next){
	Model.info(req.param('id'),function(err,docItem){
		if(err){
			res.render('error.html',{message:err});
			return ;
		}
		console.log(docItem);
		res.render('article_edit.html',{doc:docItem});
	});
};


exports.createOrUpdate=function(req,res,next){
	var id=req.param('id');
	var title=req.param('title');
	var content=req.param('content');
	var errStr;
	if(title==null){
		errStr="title is empty";
	}
	else if(content==null){
		errStr="content is empty";
	}
	if(errStr!=null){
		return res.render('error.html',{message:errStr});
	}

	var id =req.param('id');
	if(id && id!=""){

		Model.update(id,title,content,function(err){
			if(err){
				res.render('error.html',{message:err});
				return;
			}
			res.redirect('/article/infoView/'+id);
		});
	}
	else{
		Model.add(title,content,function(err){
						if(err){
							res.render('error.html',{message:err});
							return ;
						}

						 // 获得文件的临时路径
					    var tmp_path = req.files.myfile.path;
					    // 指定文件上传后的目录 - 示例为"images"目录。 
					    var target_path =  '../public/uploadimg/' + req.files.myfile.name;
					    console.log('tmp_path is'+tmp_path);
					    console.log('target_path is'+target_path);
					    // 移动文件
					  //   fs.rename(tmp_path, target_path, function(err) {
					  //     if (err) {
					  //     	console.log(err);
					  //     }
					  //     // 删除临时文件夹文件, 
					  //     fs.unlink(tmp_path, function() {
					  //        if (err) throw err;
					  //        res.send('File uploaded to: ' + target_path + ' - ' + req.files.myfile.size + ' bytes');
					  //     });
					  //   });


						res.render('success.html',{message:"title is:"+title+"content is:"+content});
		});
	}

};


exports.delete=function(req,res,next){
	Model.del(req.param('id'),function(err){
		if(err){
			res.render('error.html',{message:err});
			return ;
		}

		res.redirect('/article/listView');
	});
};
 

exports.listView=function(req,res,next){
	Model.list(function(err,docs){
		if(err){
			res.render('error.html',{message:err});
			return ;
		}
		
		res.render('articlelist.html',{title:"article",preUrl:"article",docs:docs});
	});
}

 
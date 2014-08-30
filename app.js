var express = require('express')
  , todoController = require('./controllers/todoController')
  , http = require('http')  
                
 , response = http.ServerResponse.prototype
 , _render = response.render
  , config = require("./config") 
  , expressLayouts = require('express-ejs-layouts') 
  , fs = require('fs')  
  , dateHelper=require('./util/DateHelper')  
  , loginController=require('./controllers/loginController')
  , userController=require('./controllers/userController.js')
  , genJinController=require('./controllers/GenJinController')
  , webSiteConfig=require('./dao/WebsiteConfig');      
    
           
           
       
      
   
       
var app = express();                    
     
app.engine('html', require('ejs').renderFile);   
    
app.configure(function(){          
      
  app.set('port', config.port);     
  app.set('view engine', 'ejs');    
  app.set('layout', 'dashboard.html'); // defaults to 'layout'     
  app.use(expressLayouts);  
  // app.set("layout extractScripts", true) 
  app.set('views', __dirname + '/views');     
  app.set('view options', {   
	  layout: true  
	  });     

  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:(__dirname + '/uploads')}));
  app.use(express.methodOverride());  
  app.use(express.cookieParser('likeshan')); 
  app.use(express.session({ secret: "andylau" }));
  app.use(app.router);   
  app.use(express.static(__dirname + '/public'));  
  
});      
   

       

 
app.configure('development', function(){    
  app.use(express.errorHandler());      
});      
var webSiteConfigInstance;            
var getName=function(obj){         
					if(obj && obj.name){ 
						return obj.name;
					}
					else{
						return "";
					} 
				}; 
   
var nullToEmpty=function(value){
	if(!value){
		return "";
	}
	return value; 
} ;
   

var filterFun=function(req,res,next){   
	console.log('run here haha!')
	var orginRender=res.render;     
   
	res.render = function(view, options) {    
		   
		if(!webSiteConfigInstance){
			webSiteConfig.getWebSiteConfig(function(err,doc){
 
				if(!err){
					webSiteConfigInstance=doc;

				}
				
			});
		} 
		options.getName= getName;
		options.nullToEmpty=nullToEmpty;
		options.username=null;
		if(req.session.username){
			options.username=req.session.username;
		}
		options.webSiteConfig=webSiteConfigInstance;
		orginRender.call(res, view, options); 
	};  
	return next(); 
};   
app.all('/*',filterFun);  
  
  


 

 
// app.get('/', todoController.listView); 
// app.get('/todo/listView',todoController.listView);
todoController.doMap(app);  
  
 
app.get('/angularjs/test',function(req,res,next){ 
	res.render('angularTest.html',{title:'angularjsTest'}); 
}); 
 

  
app.get('/editor',function(req,res,next){    
	
	res.render('bootstrap-wysiwyg.html',{title:"myeditor"});
	 
});     
 
app.get('/loginView',loginController.loginView);
app.post('/login',loginController.login);
app.get('/login/:userName/:password',loginController.loginJson);
app.get('/logout',loginController.logout);

app.get('/user/delete/:id',userController.delete); 
app.get('/user/editView/:id',userController.editView);
app.get('/user/addView',userController.addView);
app.post('/user/createOrUpdate',userController.createOrUpdate);
app.get('/user/listView',userController.listView); 
app.get('/user/list',userController.list);
          

var articleController=require('./controllers/articleController'); 
app.get('/article/listView',articleController.listView); 
app.get('/article/addView',articleController.addView);
app.post('/article/createOrUpdate',articleController.createOrUpdate);
app.get('/article/editView/:id',articleController.editView); 
app.post('/article/createOrUpdate',articleController.createOrUpdate);
app.get('/article/infoView/:id',articleController.infoView); 
app.get('/article/delete/:id',articleController.delete);
app.get('/article/list',articleController.list);

  
var personController=require('./controllers/personController');
app.get('/person',personController.personIndex);

app.all('/person/isExist/:personName',personController.isExist);
app.get('/uploadTest',function(req,res,next){
	res.render('uploadTest.html',{});
});
app.post('/upload',function(req,res,next){
 		console.log(req.files);
			// 获得文件的临时路径
	    var tmp_path = req.files.myfile.path;

	    // 指定文件上传后的目录 - 示例为"images"目录。 
	    var target_path = __dirname+ '/public/uploadimg/' + req.files.myfile.name;
	    console.log('tmp_path is'+tmp_path);
	    console.log('target_path is'+target_path);
	    // 移动文件
	    fs.rename(tmp_path, target_path, function(err) {
	      if (err) {
	      	console.log(err);
	      }
	      // 删除临时文件夹文件, 
	      fs.unlink(tmp_path, function() {
	         if (err) throw err;
	         res.render('success.html',{message:'File uploaded to: ' + target_path + ' - ' + req.files.myfile.size + ' bytes'});
	      });
	    });

});

 
app.get('/person/listView',personController.personlistView); 
app.get('/person/listView/:pagesize/:pageindex',personController.personlistView);
app.get('/person/addView',personController.addView);
app.get('/person/editView/:id',personController.editView);
app.post('/person/createOrUpdate',personController.createOrUpdate); 
app.get('/person/delete/:id',personController.delete);
app.get('/person/list',personController.list);
app.get('/person/info/:id',personController.info);


app.get('/GenJin/addGenJin',genJinController.personAddGenJin);
app.get('/GenJin/list',genJinController.list);
var wrapKeyValuePath=function(controlerName){
 
	var controller=require('./controllers/'+controlerName+'Controller');   
	app.get('/'+controlerName+'/listView',controller.listView) ;     
	app.get('/'+controlerName+'/addView',controller.addView);  
	app.post('/'+controlerName+'/createOrUpdate',controller.createOrUpdate);  
	app.get('/'+controlerName+'/editView/:id',controller.editView);
	app.get('/'+controlerName+'/delete/:id',controller.delete);    
	app.get('/'+controlerName+'/list',controller.list);
}; 
 
// var orginController=require('./controllers/orginController');
// app.get('/orgin/add',orginController.add);
// app.post('/orgin/add',orginController.add);
// app.get('/orgin/list',orginController.list);  
// app.get('/orgin/addView',orginController.addView);  
 

 wrapKeyValuePath('orgin');

// var priceController=require('./controllers/priceController');
// app.post('/price/add',priceController.add);
// app.get('/price/list',priceController.list);
// app.get('/price/addView',priceController.addView);

wrapKeyValuePath('price');

// var mjController=require('./controllers/mjController');
// app.post('/mj/add',mjController.add);
// app.get('/mj/list',mjController.list);
// app.get('/mj/addView',mjController.addView);

wrapKeyValuePath('mj');

wrapKeyValuePath('huxing');
 
var areaController=require('./controllers/areaController');   	
app.post('/area/createOrUpdate',areaController.createOrUpdate);  
app.get('/area/listView',areaController.listView);  
app.get('/area/addView',areaController.addView); 
app.get('/area/editView/:id',areaController.editView); 
app.get('/area/delete/:id',areaController.delete);  
  
 



wrapKeyValuePath('request'); 
  
    

app.get('/area/parentAreas',areaController.getParentListJson);

app.get('/area/childAreas',areaController.getChildListByParentIdJson);
   
 
   
     
var db=require('./dao/db');             
   

           
db.connect(function(error){
    if (error) throw error;  
    
    
});
app.on('close', function(errno) { 
	db.disconnect(function(err) { }); 
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

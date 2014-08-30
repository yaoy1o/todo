/**
 * New node file
 */

var mongoose = require('mongoose')
, Schema = mongoose.Schema



var schema = Schema({
//_id     : Number,
websiteName    : {type:String,default:'your website name'},
websiteDes	: {type:String,default:'your website Describe'}

});
var WebsiteConfig=mongoose.model('websiteConfig', schema);
exports.WebsiteConfig= WebsiteConfig;


exports.setWebSiteConfig=function(websiteName,websiteDes,callback){
	exports.getWebSiteConfig(function(err,doc){
		if(err){
			throw err;
			return;
		}
		doc.websiteName=websiteName;
		doc.websiteDes=websiteDes;
		doc.save(callback);
	});
	
};

exports.getWebSiteConfig=function(callback){
	WebsiteConfig.findOne(function(err,doc){
		if(err){
			console.log(err);
			return ;
		}
		if(!doc){
			var _doc=new WebsiteConfig();
			_doc.save(function(err){

				console.log(_doc);
				callback(null,_doc);
			})
		}
		else{
			console.log(doc);
			callback(null,doc);
		}
		
	});
}



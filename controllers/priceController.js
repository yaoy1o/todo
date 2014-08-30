/**
 * New node file
 */

var Model=require('../dao/price');


 var KeyValueController=require('./KeyValueController');


KeyValueController.wrapController({exports:exports,Model:Model,title:'价格',preUrl:'price'}); 

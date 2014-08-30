/**
 * New node file
 */

var Model=require('../dao/huxing');


var KeyValueController=require('./KeyValueController');


KeyValueController.wrapController({exports:exports,Model:Model,title:'户型',preUrl:'huxing'}); 

 
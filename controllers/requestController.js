/**
 * New node file
 */

var Model=require('../dao/request');
var KeyValueController=require('./KeyValueController');


KeyValueController.wrapController({exports:exports,Model:Model,title:'需求',preUrl:'request'}); 

 
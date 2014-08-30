/**
 * New node file
 */

var Model=require('../dao/orgin');

var KeyValueController=require('./KeyValueController');


KeyValueController.wrapController({exports:exports,Model:Model,title:'来源',preUrl:'orgin'}); 

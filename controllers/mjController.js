/**
 * New node file
 */

var Model=require('../dao/mj');

var KeyValueController=require('./KeyValueController');

KeyValueController.wrapController({exports:exports,Model:Model,title:'面积',preUrl:'mj'}); 

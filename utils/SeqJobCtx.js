/*
@author chenliang
@param jobCtx a json object as context param
@param callbackArray an array object of callback function
*/
var SeqJobCtx = module.exports = function(jobCtx,callbackArray) {
    this.ctx=jobCtx;
    this.callbacks=callbackArray;

    this.next=function(){
        var cbm=this.callbacks.shift();
        if(cbm!=null){
            cbm(this);
        }
    };

    this.start=function(){
        this.next();
    };
};
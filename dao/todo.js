var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义todo对象模型
var TodoScheme = new Schema({
    title: String,
    finished: {
        type: Boolean,
        default: false
    }

    ,
    post_date: {
        type: Date,
        default: Date.now
    }
});


TodoScheme.methods.toName = function(obj) {
    if (obj.name) {
        return obj.name;
    } else {
        return "";
    }
};

//访问todo对象模型

var Todo = mongoose.model('Todo', TodoScheme);




//exports.emptyNote = { "_id": "", author: "", note: "" };

exports.add = function(title, callback) {
    var newTodo = new Todo();
    newTodo.title = title;
    newTodo.save(function(err) {
        if (err) {
            util.log("FATAL" + err);
            callback(err);
        } else {
            callback(null);
        }
    });

}

exports.delete = function(id, callback) {
    exports.findTodoById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            util.log(util.inspect(doc));
            doc.remove();
            callback(null);
        }
    });
}

exports.updateTitle = function(id, title, callback) {
    exports.findTodoById(id, function(err, doc) {
        if (err)
            callback(err);
        else {

            console.log(doc);

            doc.post_date = Date.now();
            doc.title = title;
            doc.save(function(err) {
                if (err) {
                    util.log('FATAL ' + err);
                    callback(err);
                } else
                    callback(null);
            });
        }
    });
}
exports.editFinished = function(id, finished, callback) {
    exports.findTodoById(id, function(err, doc) {
        if (err)
            callback(err);
        else {
            // doc.post_date = new Date();
            doc.finished = finished;
            doc.save(function(err) {
                if (err) {
                    util.log('FATAL ' + err);
                    callback(err);
                } else
                    callback(null);
            });
        }
    });
}

exports.allTodos = function(callback) {
    Todo.find().sort('-post_date').exec(callback);
}

exports.forAll = function(doEach, done) {
    Todo.find({}, function(err, docs) {
        if (err) {
            util.log('FATAL ' + err);
            done(err, null);
        }
        docs.forEach(function(doc) {
            doEach(null, doc);
        });
        done(null);
    });
}

var findTodoById = exports.findTodoById = function(id, callback) {
    Todo.findOne({
        _id: id
    }, function(err, doc) {
        if (err) {
            util.log('FATAL ' + err);
            callback(err, null);
        }
        callback(null, doc);
    });
}
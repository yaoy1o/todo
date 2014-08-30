"use strict";

var config = require('../config');
var db = require('../dao/todo');
var quickMapController = require('../utils/quickMapController');


exports.doMap = function(app) {
    var helper = quickMapController.getMapHelper(app, exports);

    helper.mapPath('/todo/listView',
        function(req, res, next) {
            db.allTodos(function(err, todos) {
                if (err) {
                    return next(err);
                }
                res.render('todoList.html', {
                    todos: todos
                });
            });
        }
    );



    helper.mapPath('/todo/addView', function(req, res, next) {
        res.render('todoAdd.html', {
            title: "添加任务"
        });
    });

    helper.mapPathByPost('/todo/add',
        function(req, res, next) {
            var title = req.body.title || '';
            title = title.trim();
            if (!title) {
                return res.render('error.html', {
                    message: '标题是必须的'
                });
            }
            db.add(title, function(err, row) {
                if (err) {
                    return next(err);
                }
                res.redirect('/todo/listView');
            });
        }
    );


    helper.mapPath('/todo/list',
        function(req, res, next) {
            db.allTodos(function(err, todos) {
                if (err) {
                    return next(err);

                }
                res.json({
                    state: true,
                    message: 'c001',
                    data: todos
                });
            });
        }

    );


    helper.mapPath('/todo/editView/:id',

        function(req, res, next) {
            var id = req.params.id;
            db.findTodoById(id, function(err, row) {
                if (err) {
                    return next(err);
                }
                if (!row) {
                    return next();
                }
                res.render('todoEdit.html', {
                    todo: row
                });
            });
        }

    );
    helper.mapPathByPost('/todo/edit',
        function(req, res, next) {
            var id = req.param('id');
            var title = req.body.title || '';
            title = title.trim();
            if (!id) {
                return res.render('error.html', {
                    message: 'id是必须的'
                });
            }
            if (!title) {
                return res.render('error.html', {
                    message: '标题是必须的'
                });
            }
            db.updateTitle(id, title, function(err, result) {
                if (err) {
                    return next(err);
                }
                res.redirect('/todo/listView');
            });
        }

    );


    helper.mapPath('/todo/delete/:id',
        function(req, res, next) {
            var id = req.params.id;
            db.delete(id, function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/todo/listView');
            });
        }

    );


    helper.mapPath('/todo/finish/:id',
        function(req, res, next) {
            var finished = req.query.status === 'yes' ? true : false;
            var id = req.params.id;
            db.editFinished(id, finished, function(err, result) {
                if (err) {
                    return next(err);
                }
                res.redirect('/todo/listView');
            });
        }


    );
    helper.mapPath('todo/:id',
        function(req, res, next) {

            db.findTodoById(id, function(err, row) {
                if (err) {
                    return next(err);
                }
                if (!row) {
                    return next();
                }
                res.json(row);
            });

            // res.redirect('/');
        }

    );


};
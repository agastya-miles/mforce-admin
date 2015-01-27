var express = require('express');
var router = express.Router();

var database = require('../controllers/Database.js'),
    databaseController = require('../controllers/UpdateDatabaseController'),
    AdminUsers = require('../models/adminuser.model.js'),
    DbLog = require('../models/dblog.model.js');

module.exports = function (app) {

    /* GET Home Page */
    router.get('/', function (req, res) {
        res.render('index.html');

    });
    router.get('/api/dblog', function (req, res) {
        DbLog.find({}, function (err, log) {
            res.json(log);
        });
    });

    app.io.route('deletedb', function (req) {


        console.log('deletedb');

        database.dropAllCvs(function () {

            console.log('dropAllCvs OK');

            var dbLog = new DbLog({
                when: new Date(),
                what: 'All CV deleted',
                comment: 'Manually'
            });
            dbLog.save(function (err) {
                if (err)
                    console.log(err);
            });

            req.io.emit('deletedb', {
                message: 'dropAllCvs finished',
                progress: 50

            });
            database.dropAllUsers(function () {
                var dbLog = new DbLog({
                    when: new Date(),
                    what: 'All Users deleted',
                    comment: 'Manually'
                });
                dbLog.save(function (err) {
                    if (err)
                        console.log(err);
                });

                console.log('dropAllUsers OK');
                req.io.emit('deletedb', {
                    message: 'dropAllUsers finished',
                    progress: 100,
                    finished: true
                })

            });

        });
    });


    app.io.route('copydb', function (req) {

        databaseController.copyUsers(
            function (user, progress) {
                req.io.emit('user', {
                    message: user,
                    progress: progress
                })
            },
            function () {

                var dbLog = new DbLog({
                    when: new Date(),
                    what: 'All Users copied',
                    comment: 'Manually'
                });
                dbLog.save(function (err) {
                    if (err)
                        console.log(err);
                });
                req.io.emit('user', {
                    message: 'databaseController.copyUsers finished',
                    progress: 100,
                    finished: true

                });
                console.log('databaseController.copyUsers finished');

                databaseController.copyCvs(
                    function (cv, progress) {
                        req.io.emit('cv', {
                            message: cv,
                            progress: progress,
                            finished: progress == 100
                        })
                    },
                    function () {
                        console.log('databaseController.copyCvs finished');
                        var dbLog = new DbLog({
                            when: new Date(),
                            what: 'All CV copied',
                            comment: 'Manually'
                        });
                        dbLog.save(function (err) {
                            if (err)
                                console.log(err);
                        });
                        req.io.emit('cv', {
                            message: 'copydb finished',
                            progress: 100,
                            finished: true
                        })

                    });
            });
    });


    return router;


};
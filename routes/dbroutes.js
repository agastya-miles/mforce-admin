var express = require('express');
var router = express.Router();

var database = require('../controllers/Database.js');
var databaseController = require('../controllers/UpdateDatabaseController');


var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/login');
};


module.exports = function (app) {

    app.io.route('deletedb', function (req) {


        console.log('deletedb');

        database.dropAllCvs(function () {

            console.log('dropAllCvs OK');
            req.io.emit('deletedb', {
                message: 'dropAllCvs finished',
                progress: 50

            })
            database.dropAllUsers(function () {
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
                console.log(user);
                req.io.emit('user', {
                    message: user,
                    progress: progress
                })
            },
            function () {
                req.io.emit('user', {
                    message: 'databaseController.copyUsers finished',
                    progress: 100,
                    finished: true

                });
                console.log('databaseController.copyUsers finished');

                databaseController.copyCvs(
                    function (cv, progress) {
                        console.log(cv);
                        req.io.emit('cv', {
                            message: cv,
                            progress: progress
                        })
                    },
                    function () {
                        console.log('databaseController.copyCvs finished');
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
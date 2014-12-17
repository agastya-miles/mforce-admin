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


router.get('/deletedb', isAuthenticated, function (req, res) {
    database.dropAllCvs(function () {
        console.log('OK');
    });

    database.dropAllUsers(function () {
        console.log('OK');

    });
    res.render('status', {message: 'Databasen slettet'});

});


router.get('/copydb', isAuthenticated, function (req, res) {
    databaseController.copyUsers(
        function (user) {
            console.log(user);
        },

        function () {
            console.log('databaseController.copyUsers finished');

            databaseController.copyCvs(
                function(cv) {
                    console.log(cv);
                },
                function () {
                    console.log('databaseController.copyCvs finished');

                });
        });
    res.render('status', {message: 'Database synkronisert'});

});

module.exports = router;
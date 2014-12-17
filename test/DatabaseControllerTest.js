var test = require('unit.js')
var databaseController = require('../controllers/UpdateDatabaseController');
var database = require('../controllers/Database.js');
var User = require('../models/user.model.js');
var CV = require('../models/cv.model.js');



describe('databaseController', function () {

    var dbConfig = require('../db');
    var mongoose = require('mongoose');

// Connect to DB
    mongoose.connect(dbConfig.testurl);


    //it('removeAllUsers', function(done){
    //    database.dropAllUsers( function() {
    //       done();
    //    });
    //});
    //
    //it('removeAllCvs', function(done){
    //    database.dropAllCvs( function() {
    //        done();
    //    });
    //});

    it('copyUsers', function (done) {
        databaseController.copyUsers( done );
    });

    it('copyCvs', function (done) {
        databaseController.copyCvs( done );

    });
});
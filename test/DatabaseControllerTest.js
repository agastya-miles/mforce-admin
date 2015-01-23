var test = require('unit.js')
var databaseController = require('./UpdateDatabaseController');
var database = require('./Database.js');
var User = require('./user.model.js');
var CV = require('./cv.model.js');



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
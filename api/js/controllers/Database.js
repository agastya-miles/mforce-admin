/**
 * Created by arvid on 17/12/14.
 */
var mongoose = require('mongoose'),
    User = require('../models/user.model.js'),
    CV = require('../models/cv.model.js');

var database = {

    dropAllUsers : function( done ) {
        mongoose.connection.collections['users'].drop(function (err) {
            done(err);
        });
    },

    dropAllCvs : function( done ) {
        mongoose.connection.collections['cvs'].drop(function (err) {
            done(err);
        });
    },

    insertUsers : function( users,  done) {
        mongoose.connection.collections['users'].insert(users, function (err) {
            done(err);
        });
    },

    saveUser : function( user,  done) {

        mongoose.connection.collections['users'].save(user, function (err) {
            done(err);
        });
    },

    saveCvs : function( cvs,  done) {
        mongoose.connection.collections['cvs'].save(cvs, function (err) {
            done(err);
        });
    }


};

module.exports = database;


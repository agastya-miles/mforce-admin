/**
 * Created by arvid on 17/12/14.
 */
var mongoose = require('mongoose'),
    User = require('../models/user.model.js'),
    CV = require('../models/cv.model.js'),
    Opportunity = require('../models/sfOpportunity.model.js');

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
    },

    saveOpportunities : function(opportunities, callback){
        mongoose.connection.collections['sfOpportunity'].save(opportunities, function (err) {
            callback(err);
        });
    },

    dropAllOpportunity : function(callback){
        mongoose.connection.collections['sfOpportunity'].drop(function (err) {
            callback(err);
        });
    }
};

module.exports = database;


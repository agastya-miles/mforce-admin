var mongoose = require('mongoose');
var userTag = require('../models/userTag.model');
var database = require('../controllers/Database.js');

module.exports.saveUserTags = function(req,res){
    var postedTags = req.body;
    mongoose.connection.collections['usertags'].drop(function (err) {
        console.log(err);
        mongoose.connection.collections['usertags'].insert(postedTags, function (err) {
            console.log(err);
        });
    });
    res.write("result");
    res.end();
};

module.exports.uploadUserTags = function(req,res){

    userTag.listTags(function(err,tags){
        if(err){
            console.log(err);
        }
        var tagss;
        var tagString = [];

        for(var i =0; i < tags.length; i++)
            tagString[i] = tags[i].name;

        tagss = tagString.join(",");
        res.render('uploadusertags',{tagss : tagss , uploadusertags_tab: true});
    });

};
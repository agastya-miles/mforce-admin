var mongoose = require('mongoose');
var database = require('../controllers/Database.js');
var Schema = mongoose.Schema;

var UserTagSchema = new Schema({
    _id: String,
    name : String,
});

function UserTag(){
    return tagQuery = require('./userTag.model');
}


module.exports = mongoose.model('usertags', UserTagSchema, 'usertags'); // MongoDB collection name is 'users'

module.exports.listTags = function(callback){
    UserTag().find()
        .select({
            _id:1,
            name:1
        })
        .sort()
        .lean()
        .exec(function(err, tags) {
            callback(err,tags);
        });
};

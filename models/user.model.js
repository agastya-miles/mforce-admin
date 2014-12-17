var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: String

});

module.exports = mongoose.model('User', userSchema, 'users'); // MongoDB collection name is 'users'

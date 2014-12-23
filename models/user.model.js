var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: String

});

module.exports = mongoose.model('User', UserSchema, 'users'); // MongoDB collection name is 'users'

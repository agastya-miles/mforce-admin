var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DbLogSchema = new Schema({
//    _id: String,
    when: Date,
    what: String,
    comment: String
});

module.exports = mongoose.model('DBlog', DbLogSchema, 'dblog'); // MongoDB collection name is 'dblog'

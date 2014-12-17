var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cvSchema = new Schema({
    _id: String

});

module.exports = mongoose.model('CV', cvSchema, 'cvs'); // MongoDB collection name is 'cvs'

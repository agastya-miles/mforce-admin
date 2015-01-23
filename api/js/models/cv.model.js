var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CvSchema = new Schema({
    _id: String

});

module.exports = mongoose.model('CV', CvSchema, 'cvs'); // MongoDB collection name is 'cvs'

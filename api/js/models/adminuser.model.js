var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AdminUserSchema = new Schema({
    email:  { type: String  , unique: true },
    name:  { type: String }
});



module.exports = mongoose.model('AdminUser', AdminUserSchema, 'adminusers'); // MongoDB collection name is 'adminusers'

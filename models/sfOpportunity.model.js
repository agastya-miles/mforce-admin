/**
 * Created by Miles-Mithaun on 11/4/2015.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*var sfOpportunitySchema = new Schema({
    _id: String,
    Name: String,
    Amount: Number,
    Type: String,
    OwnerId: String,
    IsWon: Boolean,
    CloseDate: Date,
    StageName: String,
    AccountName: String
});*/

var sfOpportunitySchema = new Schema({
    _id: String
});

module.exports = mongoose.model('sfOpportunity',sfOpportunitySchema,'sfOpportunity');
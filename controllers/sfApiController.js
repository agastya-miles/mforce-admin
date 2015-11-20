/**
 * Created by Mithun Ganatra on 11/4/2015.
 */

var sf = require('node-salesforce');
var config = require('../config');


// Wrapper for getting data
var sfApi = {
    getOpportunities : function (callback){
        var conn = new sf.Connection({
            // you can change loginUrl to connect to sandbox or prerelease env.
            loginUrl : config.sfAuth.loginUrl
        });

        /*console.log('Connecting Sales Force...');*/
        // Establish connection with SalesForce
        conn.login(config.sfAuth.userName, (config.sfAuth.password + config.sfAuth.accessToken), function(err, userInfo) {
            /*console.log('Sales Force : Connection established ...');*/
            if (err) { return console.error(err); }

            // If no error than Get Data from SalesForce
            var records = [];
            //var query = "SELECT AccountId, Amount, CampaignId, CloseDate, IsClosed, CreatedById, CreatedDate, CurrentGenerators__c, IsDeleted, DeliveryInstallationStatus__c, Description, ExpectedRevenue, Fiscal, FiscalQuarter, FiscalYear, ForecastCategory, ForecastCategoryName, HasOpportunityLineItem, LastActivityDate, LastModifiedById, LastModifiedDate, LeadSource, MainCompetitors__c, Name, NextStep, Id, Type, OrderNumber__c, OwnerId, Pricebook2Id, IsPrivate, Probability, TotalOpportunityQuantity, StageName, SystemModstamp, TrackingNumber__c, IsWon FROM Opportunity";
            //var query = "SELECT Id, Name, Amount, Type, OwnerId, IsWon, CloseDate, StageName, Account.Name FROM Opportunity";
            var query = "SELECT Id, Account.Name, Name, Opportunity_Type__c, Opportunity_Office__c, Owner.Name, Description, Deadline__c, CloseDate, StageName FROM Opportunity";

            /*console.log('Getting Opportunities from Sales Force...');*/
            conn.query(query, function(err, results) {
                //console.log(results);
                if (err) { return console.error(err); }

                /*console.log('Total opportunities fetched : ' + results.records.length);
                console.log('Sales Force : Closing Connection...');*/
                conn.logout(function(err) {
                    if (err) { return console.error(err); }
                    // now the session has been expired.
                    callback(results);
                });
            });
        });
    },
    getOffices : function (officeIds, callback){
        var conn = new sf.Connection({
            // you can change loginUrl to connect to sandbox or prerelease env.
            loginUrl : config.sfAuth.loginUrl
        });

        /*console.log('Connecting Sales Force...');*/
        // Establish connection with SalesForce
        conn.login(config.sfAuth.userName, (config.sfAuth.password + config.sfAuth.accessToken), function(err, userInfo) {
            /*console.log('Sales Force : Connection established ...');*/
            if (err) { return console.error(err); }

            // If no error than Get Data from SalesForce
            var records = [];

            var query = "SELECT Id, Name FROM Account WHERE Id IN (" + officeIds + ")";

            /*console.log('Getting Opportunities from Sales Force...');*/
            conn.query(query, function(err, results) {
                //console.log(results);
                if (err) { return console.error(err); }

                /*console.log('Total opportunities fetched : ' + results.records.length);
                 console.log('Sales Force : Closing Connection...');*/
                conn.logout(function(err) {
                    if (err) { return console.error(err); }
                    // now the session has been expired.
                    callback(results);
                });
            });
        });
    }
}

module.exports = sfApi;



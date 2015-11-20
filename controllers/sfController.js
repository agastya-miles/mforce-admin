/**
 * Created by Mithun Ganatra on 11/4/2015.
 */

var sfApiController = require('./sfApiController'),
    databaseController = require('./Database'),
    DbLog = require('../models/dblog.model.js'),
    debug = require('debug')('SalesForce-MForce-admin'),
    config = require('../config.js');

function grep(Offices,callback){
    var result = [];

    Offices.forEach(function(office){
        if(callback(office))
            result.push(office);
    });

    return result;
}

function getName(Id,Offices){
    if(typeof(Id) != "undefined" && Id != null){
        var result = grep(Offices, function(e){ return e.Id == Id ; });

        if(result.length > 0)
            return result[0].Name;

        return "";
    }
    return "";
}

var sfController = {
    syncOpportunities: function(progressHandler,callback){
        //Get opportunities from SalesForce

        sfApiController.getOpportunities(function(resultObj){

            //Save opportunities in mongoDB
            var length = resultObj.records.length;
            var percentPerOpportunity = 100/length;
            var progressPercent = 0;

            var officeIds = "";

            resultObj.records.forEach(function(row) {
                if (typeof(row.Opportunity_Office__c) != "undefined" && row.Opportunity_Office__c != null) {
                    if (officeIds.indexOf(row.Opportunity_Office__c) < 0) {
                        if(officeIds.length > 0)
                            officeIds += ",'" + row.Opportunity_Office__c + "'";

                        else
                            officeIds += "'" + row.Opportunity_Office__c + "'";
                    }
                }
            });

            sfApiController.getOffices(officeIds, function(accountResults){
                resultObj.records.forEach(function(record){
                    var rec = {
                        _id: record.Id,
                        AccountName: record.Account.Name,
                        Name: record.Name,
                        Type: record.Opportunity_Type__c,
                        Office: getName(record.Opportunity_Office__c,accountResults.records),
                        OwnerName: record.Owner.Name,
                        Description: record.Description,
                        Deadline: record.Deadline__c,
                        CloseDate: record.CloseDate,
                        StageName: record.StageName
                    }

                    databaseController.saveOpportunities(rec,function(err){
                        if(err){
                            console.error(err);
                            throw err;
                        }

                        if(--length == 0){
                            console.log("All " + resultObj.records.length + " SalesForce Opportunities are saved in MongoDB....");
                            callback(err);
                        }
                        else{
                            progressPercent += percentPerOpportunity;
                            progressHandler(rec._id,progressPercent);
                        }
                    });
                });
            });
        });
    },
    autoUpdateOpportunity: function(){
        if(!config.sfAuth.sfAutoSyncEnabled){
            var dbLog = new DbLog({
                when: new Date(),
                what: 'SalesForce sync operation is Aborted as auto sync is disabled!',
                comment: 'Scheduled'
            });
            dbLog.save(function (err) {
                if (err)
                    console.log(err);
                else
                    console.log('SalesForce sync operation is Aborted!');
            });
            return;
        }

        sfController.syncOpportunities(function(OpportunityId,percentProgress){
            debug(percentProgress + "% Completed");
            //console.info("SalesForce-MForce-admin -- " + percentProgress + "% Completed");
        },function(err){
            var dbLog = new DbLog({
                when: new Date(),
                what: 'SalesForce sync operation is completed!',
                comment: 'Scheduled'
            });
            dbLog.save(function (err) {
                if (err)
                    console.log(err);
                else
                    console.log('SalesForce sync operation is completed!');
            });
        });
    }
}

module.exports = sfController;


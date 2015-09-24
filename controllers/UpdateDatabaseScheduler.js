var schedule = require('node-schedule'),
    config = require('../config.js').synchSchedule,
    databaseController = require('../controllers/UpdateDatabaseController'),
    debug = require('debug')('cv-partner-admin'),
    DbLog = require('../models/dblog.model.js');


schedule.scheduleJob(config, function () {
    console.log('Start schedule database syncronization');

    databaseController.copyUsers(
        function (user) {
            debug(user);
        },
        function () {
            console.log('databaseController.copyUsers finished');
            var dbLog = new DbLog({
                when: new Date(),
                what: 'All Users copied',
                comment: 'Scheduled'
            });
            dbLog.save(function (err) {
                if (err)
                    console.log(err);
            });
            databaseController.copyCvs(
                function (cv) {
                    debug(cv);
                },
                function () {
                    console.log('databaseController.copyCvs finished');
                    var dbLog = new DbLog({
                        when: new Date(),
                        what: 'All CVS copied',
                        comment: 'Scheduled'
                    });
                    dbLog.save(function (err) {
                        if (err)
                            console.log(err);
                    });
                });
        });
});

//cron will call this method to synch cvpartner database at given time schedule.
function autoUpdateDBscheduler(){

    databaseController.copyUsers(
        function (user) {
            debug(user);
        },
        function () {
            console.log('databaseController.copyUsers finished');
            var dbLog = new DbLog({
                when: new Date(),
                what: 'All Users copied',
                comment: 'Scheduled'
            });
            dbLog.save(function (err) {
                if (err)
                    console.log(err);
            });
            databaseController.copyCvs(
                function (cv) {
                    debug(cv);
                },
                function () {
                    console.log('databaseController.copyCvs finished');
                    var dbLog = new DbLog({
                        when: new Date(),
                        what: 'All CVS copied',
                        comment: 'Scheduled'
                    });
                    dbLog.save(function (err) {
                        if (err)
                            console.log(err);
                    });
                });
        });
}

exports.autoUpdateDBscheduler = autoUpdateDBscheduler;

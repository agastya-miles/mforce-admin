var schedule = require('node-schedule');
var config = require('../config.js').synchSchedule;
var databaseController = require('../controllers/UpdateDatabaseController');
var debug = require('debug')('cv-partner-admin');
var DbLog = require('../models/dblog.model.js');


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



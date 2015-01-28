var Reflux = require("reflux");
var jQuery = require('jquery');

var DatabaseApi = require('../web-api/DatabaseApi');
var DatabaseActions = require('../actions/DatabaseActions.reflux.js');



var _progress = {
    userDatabaseProperties: {
        progress: 0,
        finished: false
    },
    cvDatabaseProperties: {
        progress: 0,
        finished: false
    },

    deleteDatabaseProperties: {
        progress: 0,
        finished: false
    }
};


var _dblog = [];


var databaseApiCallback = ({

    userProgress: function (progress) {
        _progress.userDatabaseProperties = progress;
        DatabaseStore.trigger("userProgress");
        console.log(progress);
    },

    cvProgress: function (progress) {
        _progress.cvDatabaseProperties = progress;
        DatabaseStore.trigger("cvProgress");
        console.log(progress);

    },

    deleteProgress: function (progress) {
        console.log(progress);
        _progress.deleteDatabaseProperties = progress;
        DatabaseStore.trigger("deleteProgress");

    },

    load: function (dblog) {
        console.log("load");
        _dblog = [];
        dblog.forEach(function (entry) {
            _dblog.push( entry);
        });

        DatabaseStore.trigger("dblogLoad");
    }

});


var DatabaseStore = Reflux.createStore({

    init: function () {
        this.listenTo(DatabaseActions.syncDatabase, function(){
            _progress.cvDatabaseProperties = {
                progress: 0,
                finished: false
            };
            _progress.userDatabaseProperties = {
                progress: 0,
            };
            this.trigger();
            DatabaseApi.syncDatabase();
        });
        finished: false
        this.listenTo(DatabaseActions.deleteDatabase, function(){
            _progress.deleteDatabaseProperties = {
                progress: 0,
                finished: false
            };
            this.trigger();
            DatabaseApi.deleteDatabase();
        });

        DatabaseApi.registerCallBack(databaseApiCallback);
        DatabaseApi.load();
    },

    getDbLog: function () {
        return _dblog;
    },

    getDatabaseViewProgress : function () {
        return _progress;
    }


});






module.exports = DatabaseStore;


var AppDispatcher = require('../dispatcher/AppDispatcher');

var EventEmitter = require('events').EventEmitter;
var DatabaseConstants = require('../constants/DatabaseConstants');

var assign = require('object-assign');

var CHANGE_EVENT = 'change';


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

var DatabaseStore = assign({}, EventEmitter.prototype, {


    getDbLog: function () {
        return _dblog;
    },

    getDatabaseViewProgress : function () {
       return _progress;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },


    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});



// Register callback to handle all updates
AppDispatcher.register(function (action) {
    console.log(action);

    switch (action.actionType) {
        case DatabaseConstants.USER_PROGRESS:
            _progress.userDatabaseProperties = action.progress;
            DatabaseStore.emitChange();
            break;

        case DatabaseConstants.CV_PROGRESS:
            _progress.cvDatabaseProperties = action.progress;
            DatabaseStore.emitChange();
            break;

        case DatabaseConstants.DELETE_PROGRESS:
            _progress.deleteDatabaseProperties = action.progress;
            DatabaseStore.emitChange();
            break;


        case DatabaseConstants.DBLOG_LOAD:
            action.dblog.forEach( function(entry){
                _dblog.push(entry);
            });
            DatabaseStore.emitChange();
            break;

        default:
        // no op
    }

});
module.exports = DatabaseStore;

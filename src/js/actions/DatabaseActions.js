var AppDispatcher = require('../dispatcher/AppDispatcher');
var DatabaseConstants = require('../constants/DatabaseConstants');
var DatabaseApi = require('../web-api/DatabaseApi');




var DatabaseActions = {

    resyncDatabase : function () {
        DatabaseApi.syncDatabase();
    },

    deleteDatabase : function () {
        DatabaseApi.deleteDatabase();
    }

};

module.exports = DatabaseActions;




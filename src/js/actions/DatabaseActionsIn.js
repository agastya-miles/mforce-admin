var AppDispatcher = require('../dispatcher/AppDispatcher');
var DatabaseConstants = require('../constants/DatabaseConstants');




var DatabaseActionsIn = {



    userProgress: function ( progress){

        AppDispatcher.dispatch({
            actionType: DatabaseConstants.USER_PROGRESS,
            progress: progress
        });

    },
    cvProgress: function(progress){

        AppDispatcher.dispatch({
            actionType: DatabaseConstants.CV_PROGRESS,
            progress: progress
        });
    },

    deleteProgress: function(progress) {

        AppDispatcher.dispatch({
            actionType: DatabaseConstants.DELETE_PROGRESS,
            progress: progress
        });
    },

    load : function(dblog){
        AppDispatcher.dispatch({
            actionType: DatabaseConstants.DBLOG_LOAD,
            dblog: dblog
        });
    }


};

module.exports = DatabaseActionsIn;




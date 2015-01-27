

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AdminUserConstants = require('../constants/AdminUserConstants');

var AdminUserActions = {

    addRow : function () {

        AppDispatcher.dispatch({
            actionType: AdminUserConstants.ADMIN_USER_ADD_ROW
        });
    },

    load : function(adminUsers){
        AppDispatcher.dispatch({
            actionType: AdminUserConstants.ADMIN_USER_LOAD,
            adminUsers: adminUsers
        });
    }

};

module.exports = AdminUserActions;
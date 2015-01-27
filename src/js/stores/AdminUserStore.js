var AppDispatcher = require('../dispatcher/AppDispatcher');

var EventEmitter = require('events').EventEmitter;
var AdminUserConstants = require('../constants/AdminUserConstants');

var assign = require('object-assign');

var CHANGE_EVENT = 'change';


var _adminUsers = [];


var AdminUserStore = assign({}, EventEmitter.prototype, {


    getAll: function () {
        return _adminUsers;
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

    switch (action.actionType) {
        case AdminUserConstants.ADMIN_USER_ADD_ROW:
            _adminUsers.push({name: "Petter", email: "pan@test.com"})
            AdminUserStore.emitChange();
            break;

        case AdminUserConstants.ADMIN_USER_LOAD:
            action.adminUsers.forEach( function(adminUser){
                _adminUsers.push(adminUser);
            });
            AdminUserStore.emitChange();
            break;
        default:
        // no op
    }

});


module.exports = AdminUserStore;

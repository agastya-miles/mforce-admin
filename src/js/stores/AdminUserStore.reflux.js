var Reflux = require("reflux");
var AdminUserApi = require('../web-api/AdminUserApi');
var AdminUserActions = require('../actions/AdminUserActions.reflux.js');

var _adminUsers = [];


var AdminUserStore = Reflux.createStore({

    init: function () {
        this.listenTo(AdminUserActions.addRow, addRow);
        AdminUserApi.onLoaded(loaded);
        AdminUserApi.load();
    },

    getAll: function () {
        return _adminUsers;
    }

});

function addRow(){
    _adminUsers.push({name: "Petter", email: "pan@test.com"});
    AdminUserStore.trigger(_adminUsers);

}

function loaded(adminUsers) {
    _adminUsers = [];
    adminUsers.forEach(function (adminUser) {
        _adminUsers.push(adminUser);
    });
    AdminUserStore.trigger(_adminUsers);
}

module.exports = AdminUserStore;

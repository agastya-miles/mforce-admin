var jQuery = require('jquery');
var AdminUserActions = require('../actions/AdminUserActions');


var AdminUserApi = Object.create ({

     load : function (){
         jQuery.get("/api/admin-users", function (adminUsers) {
             AdminUserActions.load(adminUsers);
         });
    }


});


module.exports = AdminUserApi;

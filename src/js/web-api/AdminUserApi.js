var jQuery = require('jquery');




var AdminUserApi = Object.create ({


    onLoaded: function (callback){
        this.callback = callback;
    },

    load : function (){
        var callback = this.callback;
         jQuery.get("/api/admin-users", function (adminUsers) {

             if ( callback ){
                 callback(adminUsers);
             }
         });
    }

});


module.exports = AdminUserApi;
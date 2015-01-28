var jQuery = require('jquery');
var socket = io.connect();


var DatabaseApi = Object.create({


    callback: function (data) {
        console.log("Noop receved data");
        console.log(data);

    },

    registerCallBack: function (callback){
        this.callback = callback;
        var that = this;
        // Listen for the user event.
        socket.on('user', function (data) {
            that.callback.userProgress(data);
        });
        socket.on('cv', function (data) {
            that.callback.cvProgress(data);
        });
        socket.on('deletedb', function (data) {
            that.callback.deleteProgress(data);
        });
    },

    load: function () {
        var that = this;
        jQuery.get("/api/dblog", function (dblog) {
            that.callback.load(dblog);
        });
    },


    syncDatabase: function () {
        socket.emit('copydb');
    },

    deleteDatabase: function () {
        socket.emit('deletedb');
    }

});


module.exports = DatabaseApi;

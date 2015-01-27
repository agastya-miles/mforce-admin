var jQuery = require('jquery');
var socket = io.connect();

var DatabaseActions = require('../actions/DatabaseActionsIn');


var DatabaseApi = Object.create({


    load: function () {
        jQuery.get("/api/dblog", function (dblog) {
            DatabaseActions.load(dblog);
        });
    },


    init: function () {
        // Listen for the user event.
        socket.on('user', function (data) {
            console.log(data);
            DatabaseActions.userProgress(data);
        });
        socket.on('cv', function (data) {
            console.log(data);
            DatabaseActions.cvProgress(data);
        });
        socket.on('deletedb', function (data) {
            console.log(data);
            DatabaseActions.deleteProgress(data);
        });

        this.load();
    },

    syncDatabase: function () {
        socket.emit('copydb');
    },

    deleteDatabase: function () {
        socket.emit('deletedb');
    }

});


module.exports = DatabaseApi;

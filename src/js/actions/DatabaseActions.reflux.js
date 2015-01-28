var Reflux = require("reflux");

var DatabaseActions = Reflux.createActions([
    "syncDatabase",
    "deleteDatabase",
    "userProgress",
    "cvProgress",
    "deleteProgress",
    "dblogLoad"
]);


module.exports = DatabaseActions;

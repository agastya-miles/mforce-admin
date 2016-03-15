//Heroapp scheduler calls this script that sends a request just before trggering auto DB scheduler to awake heroku app dyno.
var http = require('http'); //importing http
var options = {
    host: 'cvpartner-admin.herokuapp.com',
    port: 80,
    path: '/'
};
console.log("======WAKUP DYNO START=====");
http.get(options, function(res) {
    res.on('data', function(chunk) {
        try {
            console.log("=======WAKUP DYNO=======");
        } catch (err) {
            console.log(err.message);
        }
    });
}).on('error', function(err) {
    console.log("Error: " + err.message);
});
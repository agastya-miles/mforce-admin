var http = require('http'); //importing http
console.log("*******Wake_up_dyno Entry....");
var options = {
    host: 'cvpartner-admin.herokuapp.com',
    port: 80,
    path: '/'
};
console.log("======WAKUP DYNO START");
http.get(options, function(res) {
    res.on('data', function(chunk) {
        try {
            // optional logging... disable after it's working
            console.log("======WAKUP DYNO: HEROKU RESPONSE: " + chunk);
        } catch (err) {
            console.log(err.message);
        }
    });
}).on('error', function(err) {
    console.log("Error: " + err.message);
});
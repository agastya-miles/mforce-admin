var http = require('https');


var options = {
    hostname: 'miles.cvpartner.no',
    port: 443,
    method: 'GET',
    headers: {
        'Authorization': 'Token token="28fe6c6226f1ce9488e596f2b0f9a221"'
    }

};


var cvPartnerConnection = {
    getUsers: function (done) {
        options.path = '/api/v1/users';
        http.request(options, function (response) {
            var str = '';

            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been receieved, so we just print it out here
            response.on('end', function () {
                done(null, JSON.parse(str));
            });
        }).end();
    },

    getCvs: function (userId, cvId, done) {
        options.path = '/api/v1/cvs/' + userId + '/' + cvId;
        http.request(options, function (response) {
            var str = '';
            if (response.statusCode === 200) {


                response.on('data', function (chunk) {
                    str += chunk;
                });

                //the whole response has been receieved, so we just print it out here
                response.on('end', function () {
                    done(null, JSON.parse(str));
                });
            } else {
                done("status:" + response.statusCode + " URL: " + options.path ,null);
            }


        }).end()

    }
};


module.exports = cvPartnerConnection;



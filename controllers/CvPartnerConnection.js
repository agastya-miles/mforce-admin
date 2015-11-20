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
        options.path = '/api/v1/users?limit=1000';
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
                done("status: " + response.statusCode + " URL: " + options.path, null);
            }


        }).end()
    },

    getHistory: function(userId, cvId, done) {
        options.path = '/api/v1/history/' + userId + '/' + cvId;
        http.request(options, function (response) {
            var str = '';

            if (response.statusCode === 200) {
                response.on('data', function(chunk) {
                    str += chunk;
                });

                response.on('end', function() {
                    done(null, JSON.parse(str));
                });
            } else {
                done("status: " + response.statusCode + " URL: " + options.path, null);
            }
        }).end();
    },

    // CV Partner api call to fetch set of industries with
    // their regional (no) and international (int) counterparts
    // Sample payload

    // [{ "_id":"560a909a69702d2a9b00015a", "id":"560a909a69702d2a9b00015a", "section_type":"project_experiences", "field_name":"industry", "values":{ "no":"Energi, olje \u0026 gass"}, "category_ids":[]}]
    getProjectExpMasterData: function (done) {
        var options = {
            hostname: 'miles.cvpartner.no',
            port: 443,
            method: 'GET',
            headers: {
                'Authorization': 'Token token="28fe6c6226f1ce9488e596f2b0f9a221"'
            }
        };

        options.path = '/api/v1/masterdata/project_experiences/industry?offset=0&limit=100';
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
    }


};


module.exports = cvPartnerConnection;



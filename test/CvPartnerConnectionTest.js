var test = require('unit.js')
var cvPartner = require('../controllers/CvPartnerConnection');

describe('cvPartner', function () {

    it('getUsers', function (done) {
        cvPartner.getUsers(function (err, json) {
            if(err) {
                test.fail(err.message);
            }

            console.log(json);
            done();
        });
    });


    it ('getCvs', function(done) {
        cvPartner.getCvs('userId', 'cvId',  function(err,json) {
            if (err ){
                test.fail(err.message);
            }
            console.log(json);
            done();
        })
    })

});
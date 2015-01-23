var test = require('unit.js')
var cvPartner = require('./CvPartnerConnection');


var traverseUsers = function (i, users, handleUser, done, timeOut) {

    setTimeout(function () {
        if (i < users.length) {
            var user = users[i];
            handleUser(user.user_id, user.default_cv_id);
            traverseUsers(++i, users, handleUser, done, timeOut);
        } else {
            done();
        }
    }, timeOut);

};


describe('cvPartner', function () {

    it('getUsers', function (done) {

        cvPartner.getUsers(function (err, json) {
            if (err) {
                test.fail(err.message);
            }
            done();
        });

    });

    it('getCvs', function (done) {

        cvPartner.getUsers(function (err, users) {
            var user = users[0]
            var userId = user.user_id;
            var cvId = user.default_cv_id;

            cvPartner.getCvs(userId, cvId, function (err, json) {
                if (err) {
                    test.fail(err.message);
                }
                console.log(json);
                done();
            });

        });
    });

    it('getAllCvs', function (done) {

        cvPartner.getUsers(function (err, users) {
            // console.log(users[0]);
            traverseUsers(0, users,
                function (userId, cvId) {
                    console.log(userId);
                    console.log(cvId);
                },
                function () {
                    done();
                }, 5);

        });

    });
});

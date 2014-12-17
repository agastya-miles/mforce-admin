/**
 * Created by arvid on 16/12/14.
 */

var cvPartner = require('../controllers/CvPartnerConnection');
var User = require('../models/user.model.js');
var database = require('../controllers/Database.js');


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

var databaseController = {

    copyUsers: function (handleUser, done) {
        console.log("hepp");

        cvPartner.getUsers(function (err, users) {
            if (err)
                throw err;

            var numberOfUsersLeft = users.length;
            users.forEach(function (user) {
                handleUser( user.name);
                database.saveUser(user, function (err) {
                    if (err)
                        throw err;
                    if (--numberOfUsersLeft == 0) {
                        done();
                    }
                })
            });

        });
    },

    copyCvs: function (handleCv, done) {
        User.find()
            .select('user_id  default_cv_id')
            .lean()
            .exec(function (err, users) {
                var numberOfUsersLeft = users.length;
                traverseUsers(0, users,
                    function (userId, cvId) {
                        cvPartner.getCvs(userId, cvId, function (err, cvs) {
                            if (err)
                                throw err;
                            database.saveCvs(cvs, function (err) {
                                if (err)
                                    throw err;
                                handleCv(cvs.navn);
                                if (--numberOfUsersLeft == 0) {
                                    done();
                                }

                            });
                        });
                    },
                    function () {


                    }, 5);
            });
    }

};

module.exports = databaseController;


/**
 * Created by arvid on 16/12/14.
 */

var cvPartner = require('../controllers/CvPartnerConnection'),
    User = require('../models/user.model.js'),
    cv = require('../models/cv.model.js'),
    database = require('../controllers/Database.js'),
    _ = require('underscore');


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

var removeUsers = function (id,name) {
    User.remove({ _id: id}, function (err) {
        if(err){
            console.log('err : '+err);
        }else{
            console.log('Deleted User from users : '+name);
        }
    });

    cv.remove({ bruker_id: id}, function (err) {
        if(err){
            console.log('err : '+err);
        }else{
            console.log('Deleted User from cvs : '+name);
        }
    });
};

var markInactiveUsers = function (activeUsers) {
    User.find()
        .select('name _id')
        .exec(function (err, localUsers) {
            var activeUserNames = _.map(activeUsers, function (obj) {
                return obj.name.trim();
            });

            var listNonConsultants = [];
            if (process.env.LIST_NON_CONSULTANTS && process.env.LIST_NON_CONSULTANTS != null) {
                listNonConsultants = process.env.LIST_NON_CONSULTANTS.split(",");

                for(i = 0; i < listNonConsultants.length; i++) {
                    listNonConsultants[i]=listNonConsultants[i].replace(/[^A-NP-Z0-9]+/ig,"").toLowerCase();
                }
            }

            _.each(localUsers,function (user) {
                if (!_.contains(activeUserNames, user.name.trim())
                            || (listNonConsultants.indexOf(user.name.replace(/[^A-NP-Z0-9]+/ig,"").toLowerCase()) > -1)) {
                    removeUsers(user._id,user.name);
                }
            });
        });
};

var databaseController = {

    copyUsers: function (handleUser, done) {


        cvPartner.getUsers(function (err, users) {
            if (err)
                throw err;

            markInactiveUsers(users);

            var numberOfUsersLeft = users.length;
            users.forEach(function (user) {
                handleUser( user.name, (100 - numberOfUsersLeft * 100 / users.length) );
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
                            if (err) {
                                console.error("Copy CV:" + err)
                            } else {
                                cvPartner.getHistory(userId, cvId, function(err, history) {
                                    if (err)
                                        console.error("Copy history: " + err);
                                    else
                                        cvs.history = history;

                                    database.saveCvs(cvs, function (err) {
                                        if (err)
                                            throw err;
                                        handleCv(cvs.navn, (100 - numberOfUsersLeft * 100 / users.length));
                                    });
                                });
                            }
                            if (--numberOfUsersLeft == 0) {
                                done();
                            }
                        });
                    },
                    function () {


                    }, 3100);
            });
    }

};

module.exports = databaseController;


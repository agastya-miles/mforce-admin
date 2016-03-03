/**
 * Created by arvid on 16/12/14.
 */

var cvPartner = require('../controllers/CvPartnerConnection'),
    User = require('../models/user.model.js'),
    cv = require('../models/cv.model.js'),
    database = require('../controllers/Database.js'),
    _ = require('underscore');


var traverseUsers = function (i, users, masterIndustryArray, handleUser, done, timeOut) {

    setTimeout(function () {
        if (i < users.length) {
            var user = users[i];
            handleUser(user.user_id, user.default_cv_id);
            traverseUsers(++i, users,masterIndustryArray, handleUser, done, timeOut);
        } else {
            done();
        }
    }, timeOut);

}

var removeUsers = function (id,name) {
    User.remove({ _id: id}, function (err) {
        if(err){
            console.log('err : '+err);
        }else{
            console.log('Deleted User from users : '+name);
            cv.remove({ bruker_id: id}, function (err) {
                if(err){
                    console.log('err : '+err);
                }else{
                    console.log('Deleted User from cvs : '+name);
                }
            });
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
                cvPartner.getProjectExpMasterData(function(err,indus){
                    var masterIndustryArray=[];
                    indus.forEach(function(ind) {
                        var masterIndustry={};
                        masterIndustry.no=ind.values.no;
                        masterIndustry.int=ind.values.int;
                        masterIndustryArray.push(masterIndustry);
                    });
                var numberOfUsersLeft = users.length;
                traverseUsers(0, users, masterIndustryArray,
                    function (userId, cvId) {
                        cvPartner.getCvs(userId, cvId, function (err, cvs) {
                            if (err) {
                                console.error("Copy CV:" + err);
                            } else {
                                cvPartner.getHistory(userId, cvId, function(err, history) {
                                    if (err)
                                        console.error("Copy history: " + err);
                                    else {
                                        cvs.history = history;
                                        cvs.project_experiences.forEach(function(project){
                                            masterIndustryArray.forEach(function(mia){
                                                var projectIndustry = project.industry?(project.industry).trim().toUpperCase():project.industry;
                                                var miaIndustryNo = mia.no?(mia.no).trim().toUpperCase():mia.no;
                                                var miaIndustryInt = mia.int?(mia.int).trim().toUpperCase():mia.int;
                                                if(projectIndustry && miaIndustryNo && miaIndustryInt && (projectIndustry == miaIndustryNo || projectIndustry == miaIndustryInt) && miaIndustryInt != null){
                                                    project.industry= mia.int;
                                                }
                                            });
                                        });
                                    }
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

                    }, 5000);
                });
            });
    }

};

module.exports = databaseController;


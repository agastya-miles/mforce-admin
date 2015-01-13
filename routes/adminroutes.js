var express = require('express'),
    router = express.Router(),
    AdminUser = require('../models/adminuser.model.js');


module.exports = function () {

    router.get('/admin-users', function (req, res) {
        AdminUser.find(function (err, users) {
            res.render('adminuser', {adminusers: users, adminuser_tab: true});

        });
    });


    router.get('/api/admin-users/:id', function (req, res) {
        console.log(req.params.id);

        AdminUser.findById(req.params.id, function (err, user) {
            if (err) {
                console.log(err);
                res.status(500);
                res.json(err.message);
            } else {
                if (user) {
                    res.json(user);
                } else {
                    res.status(404);
                    res.send("Not found");
                }
            }
        });
    });


    router.get('/api/admin-users', function (req, res) {
        AdminUser.find(function (err, users) {
            res.json(users);

        });
    });

    router.post('/bootgrid/api/admin-users', function (req, res) {
        AdminUser.find(function (err, users) {
            var response = new Object({
                current: 1,
                rowCount: users.length,
                rows: users,
                total: users.length


            });
            res.json(response);

        });
    });

    router.post('/api/admin-users', function (req, res) {

        var adminUser = new AdminUser({
            email: req.body.email
        });

        adminUser.save(function (err, user) {
            if (err) {
                console.log(err);
                res.status(500);
                res.json(err.message);
            } else {
                res.status(201);
                res.location(req.originalUrl + '/' + user._id);
                res.send(adminUser);
            }

        });

    });

    router.delete('/api/admin-users/:id', function (req, res) {
        AdminUser.findByIdAndRemove(req.params.id, function (err, user) {
            if (err) {
                console.log(err);
                res.status(500);
                res.json(err.message);
            } else {
                if (user) {
                    res.json(user);
                } else {
                    res.status(404);
                    res.send("Not found");
                }
            }
        });

    });


    router.put('/api/admin-users/:id', function (req, res) {
        AdminUser.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
            if (err) {
                console.log(err);
                res.status(500);
                res.json(err.message);
            } else {
                if (user) {
                    res.json(user);
                } else {
                    res.status(404);
                    res.send("Not found");
                }
            }
        });

    });


    return router;
};
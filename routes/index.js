var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function(passport){


	/* GET login page. */
	router.get('/login', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('message') });
	});


	router.get('/logout', function(req, res) {
		req.logOut();
		res.redirect('/');
	});


	/* GET Home Page */
	router.get('/', isAuthenticated, function(req, res){
		res.render('status', { user: req.user });
	});


	// Redirect the user to Google for authentication.  When complete, Google
	// will redirect the user back to the application at
	//     /auth/google/return
	router.get('/auth/google', passport.authenticate('google',{ scope: 'email',prompt: 'select_account'}));

	// Google will redirect the user to this URL after authentication.  Finish
	// the process by verifying the assertion.  If valid, the user will be
	// logged in.  Otherwise, authentication has failed.
	router.get('/auth/google/callback', 
	  passport.authenticate('google', { successRedirect: '/',
	                                    failureRedirect: '/login'}));
	return router;
}

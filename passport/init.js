var google = require('./login-google.js'),
    User = require('../models/user.model');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user);
    });

    passport.deserializeUser(function(id, done) {
            console.log('deserializing user:',id);
            done(null, id);
    });

  
    google(passport);
}
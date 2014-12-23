var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    config = require('../config.js').auth;

module.exports = function (passport) {

    passport.use(new GoogleStrategy({
            passReqToCallback: true,
            clientID: config.clientID,
            clientSecret: config.clientSecret,
            callbackURL: config.callbackURL
        },
        function (req, accessToken, refreshToken, profile, done) {
            console.log(profile._json);
            var emails = profile._json.email;
            var user = {};
            user.email = profile._json.email;
            user.name = profile._json.name;
            if (user.email.match(/.*@miles.no/)) {
                return done(null, user);
            }

            return done(null, false,
                req.flash('message', 'You must log on with a valid Google Miles account'));

        }
    ));

}

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport){

passport.use(new GoogleStrategy({
    passReqToCallback : true,
   clientID: '963538669701-gme2v6et0fs288454402qthgke4j20p1.apps.googleusercontent.com',
            clientSecret: 'gG3E9bn7-9YYKzQj-aR_qSHl',
            callbackURL: "http://127.0.0.1:3001/auth/google/callback"

  },
  function(req, accessToken, refreshToken, profile, done) {
  	console.log(profile._json);
  	var emails = profile._json.email;
  	var user = { };
  	user.email = profile._json.email;
  	user.name = profile._json.name;
  	if ( user.email.match(/.*@miles.no/)){
  		return done(null, user);
  	}

  	 return done(null, false, 
                req.flash('message', 'You must log on with a valid Google Miles account:')); 

  }
));

}

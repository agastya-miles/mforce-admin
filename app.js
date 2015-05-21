var express = require('express.io'),
    hbs = require('hbs'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    scheduler = require('./controllers/UpdateDatabaseScheduler'),
    config = require('./config.js'),
    mongoose = require('mongoose'),
    isAuthenticated = require('./controllers/auth.js');


mongoose.connect(config.mongodb_uri, function (err) {
    console.log('MongoDB URL:' + config.mongodb_uri);
    if (err) {
        console.log(err)
    }
})


var app = express();
// enable ssl redirect

app.http().io()


// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./heroku-ssl-redirect.io')());

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({
    secret: 'ajshdgfjahsdgfkjashgf',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

//var passportSocketIo = require("passport.socketio");
//app.io.use(passportSocketIo.authorize({
//    cookieParser: cookieParser,
//    key:         expressSid,       //make sure is the same as in your session settings in app.js
//    secret:      secretKey,    //make sure is the same as in your session settings in app.js
//    store:       sessionStore        //you need to use the same sessionStore you defined in the app.use(session({... in app.js
//
//}));

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);


app.all('*', isAuthenticated);

var dbRoutes = require('./routes/dbroutes.js')(app);
app.use('/', dbRoutes);

var adminRoutes = require('./routes/adminroutes.js')();
app.use('/', adminRoutes);

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}





module.exports = app;

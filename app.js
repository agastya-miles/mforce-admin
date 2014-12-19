var express = require('express.io');



// Handlebars for Express
var hbs = require('hbs');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var config = require('./config.js');


var mongoose = require('mongoose');
// Connect to DB


mongoose.connect(config.mongodb_uri, function(err){
    if (err){
        console.log(err);
    }
});


var app = express();
app.http().io();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);
var dbRoutes = require('./routes/dbroutes.js')(app);
    app.use('/', dbRoutes);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}



// Setup the ready route, and emit talk event.
app.io.route('adeletedb', function(req) {
    req.io.emit('talk', {
        message: 'io event from an io route on the server'
    })
});


// Setup the ready route, and emit talk event.
app.io.route('ready', function(req) {
    req.io.emit('talk', {
        message: 'io event from an io route on the server'
    })
});


app.io.set('authorization', function (handshakeData, accept) {

    //if (handshakeData.headers.cookie) {
    //
    //    handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
    //
    //    handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], 'secret');
    //
    //    if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
    //        return accept('Cookie is invalid.', false);
    //    }
    //
    //} else {
    //    return accept('No cookie transmitted.', false);
    //}

    accept(null, true);
});



module.exports = app;

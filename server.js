var express = require('express');
var bodyParser = require('body-parser')
var config = require('./config');
var passport = require('passport');
var http = require('http');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var mongoose = require('mongoose');

var fs = require('fs');
var partials = require('express-partial');

// Create the express app, set port to 5000
var app = express();
app.set('port', process.env.PORT || 5000);


app.use(morgan('dev'));
app.use(cookieParser()); 
app.use(session({ 
    secret: 'securedsession',
    resave: false,
    saveUninitialized: true 
}));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

//==================================================================
// End setup authentication
//==================================================================

app.use(express.static(__dirname + '/app'));
    //app.use(express.favicon());
app.use(bodyParser.json());
// let app use partial
//app.use(partials());

// register jade template engine
app.set('views', 'app/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
    res.render('index', { title: 'Index', message: 'LadderApp initializing...'});
});

app.get('/partials/:name', function (req, res) { 
    var name = req.params.name;
    res.render('partials/' + name);
});




http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
 Start Routes
*/

app.use('/', function (req, res) {
    res.render('index');
});

/*
End Routes
*/


app.set('port', process.env.PORT || 3000);
var debug = require('debug')('Front-end-Start');

var server = app.listen(app.get('port'), function() {
    console.log('Starting server on port 3000');
  debug('Express server listening on port ' + server.address().port);
});


var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var commentsRouter = require('./routes/comments');
var tagsRouter = require('./routes/tags');

var app = express();

app.use( logger('dev') );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cookieParser());
app.use( express.static( path.join( __dirname, 'public')) );

app.use( '/', indexRouter);
app.use( '/api/users', usersRouter);
app.use( '/api/articles', articlesRouter);
app.use( '/api/comments', commentsRouter);
app.use( '/api/tags', tagsRouter);

module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var articlesRouter = require('./routes/articles');
var commentsRouter = require('./routes/comments');
var tagsRouter = require('./routes/tags');
var authRouter = require('./routes/authentication');

var app = express();

app.use( logger('dev') );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cookieParser());
app.use( express.static( path.join( __dirname, 'public')) );

// accept Cors requests
app.use(cors());

app.use( '/', indexRouter);
app.use( '/api/users', usersRouter);
app.use( '/api/articles', articlesRouter);
app.use( '/api/comments', commentsRouter);
app.use( '/api/tags', tagsRouter);
app.use( '/api/auth', authRouter);

module.exports = app;

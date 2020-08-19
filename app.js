var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var dotenv = require('dotenv');
var connectDB = require('./config/db');
dotenv.config({ path: './config/config.env'});
connectDB();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();  
// view engine setup
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);








module.exports = app;

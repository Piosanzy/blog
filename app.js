const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const favicon = require('serve-favicon');


require("dotenv").config();

const pageRouter = require('./routes/page/index');
const postingApiRouter = require('./routes/api/posting/index');
const chatApiRouter = require('./routes/api/chat/index');
const registerApiRouter = require('./routes/api/register/index');
const userRouter = require('./routes/page/user/index');
const userApiRouter = require('./routes/api/user/index');
const postingRouter = require('./routes/page/posting/index');
const chatRouter = require('./routes/page/chat/index');

const mongoDBURI = process.env.ATLAS_URI;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use("/js-cookie", express.static(path.join(__dirname, "node_modules/js-cookie")));
app.use("/moment", express.static(path.join(__dirname, "node_modules/moment")));
app.use('/@fortawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome')));
app.use('/froala-editor', express.static(path.join(__dirname, 'node_modules/froala-editor')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


app.use('/', pageRouter);
app.use('/api/posting', postingApiRouter);
app.use('/api/chat', chatApiRouter);
app.use('/api/register', registerApiRouter);
app.use('/api/user', userApiRouter);
app.use('/user', userRouter);
app.use('/posting', postingRouter);
app.use('/chat', chatRouter);

app.use(morgan('dev'));

app.set('jwt-secret', process.env.SECRET);

const mongo = mongoose.connection;
mongo.once("open", () => {
    console.log("MongoDB database connection success");
});


mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then((res) => {
    console.log("mongodb Connect");
}).catch((err) => {
    console.error(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

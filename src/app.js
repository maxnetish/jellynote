import express from 'express';
import path from 'path';
import wwwConfig from '../config/www.json';
import authConfig from '../config/auth.json';
import mongoose from 'mongoose';
import mongooseConfig from '../config/mongoose.json';

import * as routes from './routes';

import bodyParser from 'body-parser';
import responseTime from 'response-time';
import serveFavicon from 'serve-favicon';
import mongoAdmin from 'sriracha';
import serveStatic from 'serve-static';
import session from 'express-session';
import passport from 'passport';
import * as passportConfig from './passport';
import {Strategy} from 'passport-local';

import cookieParser from 'cookie-parser';

function echoRespond(req, res) {
    res.send({'hello': req.params.name});
}

var app = express();
var apiApp = express();

/**
 * Setup passport
 */
passportConfig.setupPassport(passport);

/**
 * setup mongoose
 */
mongoose.Promise = global.Promise;
mongoose.connect(mongooseConfig.connectionUri, Object.assign(mongooseConfig.connectionOptions, {promiseLibrary: global.Promise}))
    .then(function (response) {
        console.info(`Connected to database ${mongooseConfig.connectionUri}`);
        return response;
    })
    .catch(function (err) {
        console.error(`Cannot connect to database ${mongooseConfig.connectionUri}, ${err}`);
    });

/**
 * setup app
 */
// app.use(serveFavicon());
app.use(responseTime());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(session({
    cookie: {
        httpOnly: true,
    },
    name: 'jellynote.id',
    proxy: true,
    secret: 'À la fin de 1980, il rencontre à l’université',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiApp);
app.use(serveStatic(path.join(__dirname, 'assets'), {
    index: false
}));
app.get('/', function (req, res) {
    let indexFile;
    if (req.user && req.user.role==='admin'){
        indexFile = 'index-admin.html';
    } else {
        indexFile = 'index-pub.html';
    }
    res.sendFile(path.join(__dirname, indexFile));
});
// TODO выпилить mongo-admin: бесполезно
// app.use('/mongo-admin', mongoAdmin({
//     userName: authConfig.admin.userName,
//     password: authConfig.admin.password
// }));
app.use('/login', routes.login);
app.use('/logout', routes.logout);
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Internal error');
});

/**
 * setup apiApp
 */
apiApp.use(bodyParser.json());
apiApp.get('/hello/:name', echoRespond);
// add letters api
apiApp.use('/letters', routes.letters);
apiApp.use('/session', routes.session);
apiApp.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({error: 'internal error'});
});

/**
 * begin listen port
 */
let portToListen = process.env.PORT || wwwConfig.port || 3000;
app.listen(portToListen, function () {
    console.info(`${app.name} started and listening on port ${portToListen}`);
});

export default app;
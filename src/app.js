import restify from 'restify';
import wwwConfig from '../config/www.json'
import addRoutes from './routes';
import bunyan from 'bunyan';
import mongoose from 'mongoose';
import mongooseConfig from '../config/mongoose.json';
import os from 'os';


function echoRespond(req, res, next) {
    res.send({'hello': req.params.name});
    next();
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

var app = restify.createServer({
    name: 'jellynote'
});


// init mongoose
mongoose.Promise = global.Promise;
mongoose.connect(mongooseConfig.connectionUri, Object.assign(mongooseConfig.connectionOptions, {promiseLibrary: global.Promise}))
    .then(function (response) {
        console.info(`Connected to database ${mongooseConfig.connectionUri}, response: ${response}`);
        return response;
    })
    .catch(function (err) {
        console.error(`Cannot connect to database ${mongooseConfig.connectionUri}, ${err}`);
    });

app.on('error', onError);

// body parser
app.use(restify.bodyParser({
    maxBodySize: 1048576,
    mapParams: false,
    mapFiles: false,
    overrideParams: false,
    // multipartHandler: function(part) {
    //     part.on('data', function(data) {
    //         /* do something with the multipart data */
    //     });
    // },
    // multipartFileHandler: function(part) {
    //     part.on('data', function(data) {
    //         /* do something with the multipart file data */
    //     });
    // },
    keepExtensions: false,
    uploadDir: os.tmpdir()
    // multiples: true
    // hash: 'sha1'
}));

// query parser
app.use(restify.queryParser({
    mapParams: true
}));

// compress
app.use(restify.gzipResponse());

app.get('/hello/:name', echoRespond);
app.head('/hello/:name', echoRespond);

// FIXME remove or switch in debug mode only
app.on('after', restify.auditLogger({
    log: bunyan.createLogger({
        name: 'audit',
        stream: process.stdout
    })
}));

addRoutes(app);

app.listen(process.env.PORT || wwwConfig.port || 3000, function () {
    console.info(`${app.name} started and listening at ${app.url}`);
});

export default app;
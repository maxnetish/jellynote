import restify from 'restify';
import wwwConfig from '../config/www.json'
import addRoutes from './routes';
import bunyan from 'bunyan';


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

app.on('error', onError);

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

app.listen(process.env.PORT || wwwConfig.port || 3000, function() {
    console.log(`${app.name} listening at ${app.url}`);
});

export default app;
import restify from 'restify';

export default function (app) {

    app.get({
        name: 'static index',
        path: '/'
    }, restify.serveStatic({
        directory: './build',
        file: 'index.html',
        charSet: 'utf-8'
    }));

    app.get({
        name: 'static assets',
        path: /\/assets\/?.*/
    }, restify.serveStatic({
        directory: './build',
        charSet: 'utf-8'
    }));
};
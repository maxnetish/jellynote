const path = require('path');
const webpack = require('webpack');

// like 'react-app/routes/bla-bla/index.js'
var routeComponentRegex = /react-app\/routes\/[^\/]+\/index\.js/;

module.exports = {
    cache: true,

    // entry: './build/client.js',
    entry: {
        'client': './build/client.js',
        'common': ['react', 'react-dom', 'core-js/es6/promise', 'whatwg-fetch', 'reflux', 'elemental/lib/components/Button']
        // vendor: ['core-js/es6/promise', 'whatwg-fetch', 'react', 'react-dom']
        // jquery: "./app/jquery",
        // bootstrap: ["!bootstrap-webpack!./app/bootstrap/bootstrap.config.js", "./app/bootstrap"],
        // react: "./app/react"
    },
    output: {
        path: 'build/assets',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/'
    },
    // output: {
    //     path: 'build/assets',
    //     filename: "[name].bundle.js",
    // },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common', 'common.bundle.js')
    ],
    module: {
        loaders: [
            // make sure to exclude route components here
            // {
            //     test: /\.js$/,
            //     include: path.resolve(__dirname, 'build'),
            //     exclude: routeComponentRegex,
            //     loader: 'console'
            // },
            // lazy load route components
            // {
            //     test: routeComponentRegex,
            //     include: path.resolve(__dirname, 'build'),
            //     loaders: ['console', 'bundle?lazy']
            // }
            // // required to write "require('./style.css')"
            // { test: /\.css$/,    loader: "style-loader!css-loader" },
            //
            // // required for bootstrap icons
            // { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            // { test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
            // { test: /\.eot$/,    loader: "file-loader?prefix=font/" },
            // { test: /\.svg$/,    loader: "file-loader?prefix=font/" },

            // required for react jsx
            // { test: /\.js$/,    loader: "jsx-loader" },
            // { test: /\.jsx$/,   loader: "jsx-loader?insertPragma=React.DOM" },
        ]
    }/*,
    resolve: {
        alias: {
            // Bind version of jquery
            jquery: "jquery-2.0.3",

            // Bind version of jquery-ui
            "jquery-ui": "jquery-ui-1.10.3",

            // jquery-ui doesn't contain a index file
            // bind module to the complete module
            "jquery-ui-1.10.3$": "jquery-ui-1.10.3/ui/jquery-ui.js",
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            // Automtically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            jQuery: "jquery",
            $: "jquery"
        })
    ]*/
};
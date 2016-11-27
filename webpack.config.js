const path = require('path');
const webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        'webapp-pub': './build/client-pub.js',
        'webapp-admin': './build/client-admin.js',
        vendor: ['core-js/es6/promise', 'whatwg-fetch', 'react', 'react-dom']
        // jquery: "./app/jquery",
        // bootstrap: ["!bootstrap-webpack!./app/bootstrap/bootstrap.config.js", "./app/bootstrap"],
        // react: "./app/react"
    },
    output: {
        path: 'build/assets',
        filename: "[name].bundle.js",
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],
    module: {
        loaders: [
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

module.exports = function (grunt) {

    var buildDir = 'build';
    var srcDir = 'src';
    var mainAppFile = 'app.js';
    var webpack = require('webpack');

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: [
            buildDir
        ],

        copy: {
            index2Build: {
                files: [{
                    expand: false,
                    filter: 'isFile',
                    flatten: false,
                    src: srcDir + '/index.html',
                    dest: buildDir + '/index.html'
                }]
            }
        },

        babel: {
            'dev': {
                options: {
                    sourceMap: true,
                    presets: ['react'],
                    plugins: ['transform-es2015-modules-commonjs'],
                    // auxiliaryCommentBefore: 'Babel jsx transform:',
                    // auxiliaryCommentAfter: 'end of jsx transform',
                    ast: false
                },
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        cwd: 'src/',
                        src: ['**/*.js*'],
                        dest: buildDir + '/'
                    }
                ]
            },
            'prod': {
                options: {
                    sourceMap: false,
                    presets: ['react'],
                    // uglify2JS doesn't support es6
                    plugins: [
                        'transform-es2015-modules-commonjs',
                        'transform-es2015-template-literals'
                    ],
                    ast: false
                },
                files: [
                    {
                        expand: true,
                        filter: 'isFile',
                        cwd: 'src/',
                        src: ['**/*.js*'],
                        dest: buildDir + '/'
                    }
                ]
            }
        },

        webpack: {
            options: require('./webpack.config.js'),
            dev: {
                devtool: "sourcemap",
                debug: true
            },
            prod: {
                plugins: [
                    new webpack.DefinePlugin({
                        "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                ]
            }
        }
    });

    grunt.registerTask('build', ['clean', 'copy:index2Build', 'babel:dev', 'webpack:dev']);
    grunt.registerTask('prod', ['clean', 'copy:index2Build', 'babel:prod', 'webpack:prod']);
};
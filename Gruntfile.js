module.exports = function (grunt) {

    var buildDir = 'build';
    var srcDir = 'src';
    var mainAppFile = 'app.js';
    var webpack = require('webpack');
    var webpackCommonOptions = require('./webpack.config.js');
    var path = require('path');

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
                    expand: true,
                    filter: 'isFile',
                    flatten: true,
                    src: srcDir + '/*.html',
                    dest: buildDir
                }]
            }
        },

        babel: {
            'dev': {
                options: {
                    sourceMap: true,
                    presets: ['react', 'es2015'],
                    // plugins: ['transform-es2015-modules-commonjs'],
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
                    presets: ['react', 'es2015'],
                    // uglify2JS doesn't support es6
                    // plugins: [
                    //     'transform-es2015-modules-commonjs',
                    //     'transform-es2015-template-literals'
                    // ],
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
            options: webpackCommonOptions,
            dev: {
                devtool: "sourcemap",
                debug: true
            },
            prod: {
                plugins: webpackCommonOptions.plugins.concat([
                    new webpack.DefinePlugin({
                        "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.DedupePlugin(),
                    new webpack.optimize.UglifyJsPlugin()
                ])
            }
        },

        less: {
            dev: {
                files: [{
                    src: 'src/react-app/**/*.less',
                    dest: buildDir + '/assets/bundle.css'
                }],
                options: {
                    sourceMap: true,
                    outputSourceFiles: true,
                    plugins: [
                        new (require('less-plugin-npm-import')),
                        new (require('less-plugin-autoprefix'))({
                            browsers: ['last 2 versions']
                        })
                    ]
                }
            },
            prod: {
                files: [{
                    src: 'src/react-app/**/*.less',
                    dest: buildDir + '/assets/bundle.css'
                }],
                options: {
                    sourceMap: false,
                    plugins: [
                        new (require('less-plugin-npm-import')),
                        new (require('less-plugin-autoprefix'))({
                            browsers: ['last 2 versions']
                        })
                    ]
                }
            }
        },

        delta: {
            options: {
                livereload: false
            },

            /**
             * When our JavaScript source files change, we want to browserify
             * but uglifying really not needed
             */
            'js-files': {
                files: [srcDir + '/**/*.js*'],
                tasks: ['babel:dev', 'webpack:dev']
            },
            'html-files': {
                files: [srcDir + '/**/*.html'],
                tasks: ['copy:index2Build']
            },

            /**
             * When the LESS files change, we need to compile them.
             * but not minify
             */
            less: {
                files: ['src/react-app/**/*.less'],
                tasks: ['less:dev']
            }
        }
    });

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */
    grunt.renameTask('watch', 'delta');

    grunt.registerTask('dev', ['clean', 'copy:index2Build', 'babel:dev', 'webpack:dev', 'less:dev', 'delta']);
    grunt.registerTask('prod', ['clean', 'copy:index2Build', 'babel:prod', 'webpack:prod', 'less:prod']);
};
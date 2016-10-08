
module.exports = function (grunt) {

    var buildDir = 'build';
    var srcDir = 'src';
    var mainAppFile = 'app.js';

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
            'transform': {
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
            }
        },

        webpack: {
            options: require('./webpack.config.js'),
            dev: {
                // plugins: webpackConfig.plugins.concat(
                //     new webpack.DefinePlugin({
                //         "process.env": {
                //             // This has effect on the react lib size
                //             "NODE_ENV": JSON.stringify("production")
                //         }
                //     }),
                //     new webpack.optimize.DedupePlugin(),
                //     new webpack.optimize.UglifyJsPlugin()
                // )
                devtool: "sourcemap",
                debug: true
            }
        }
    });

    grunt.registerTask('build', ['clean', 'copy:index2Build', 'babel:transform', 'webpack:dev']);
};
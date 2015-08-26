// Karma configuration
// Generated on Thu Jul 02 2015 15:51:34 GMT-0300 (BRT)

module.exports = function (config) {
    config.set({

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'www',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'lib/angular/angular.js',
            'lib/angular-mocks/angular-mocks.js',
            'lib/angular-animate/angular-animate.js',
            'lib/angular-cookies/angular-cookies.js',
            'lib/angular-resource/angular-resource.js',
            'lib/angular-route/angular-route.js',
            'lib/angular-sanitize/angular-sanitize.js',
            'lib/angular-touch/angular-touch.js',
            'js/*.js',
            'app/*.js',
            'app/**/*.js',
            'component/*.js',
            'component/**/*.js',
            'module/*.js',
            'module/**/*.js',
        ],


        // list of files to exclude
        exclude: [],


        // Which plugins to enable
        plugins         : [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],
        preprocessors   : {
            'app/**/*.js'       : 'coverage',
            'components/**/*.js': 'coverage',
            'modules/**/*.js'   : 'coverage'
        }
        ,
        reporters       : [
            'progress',
            'coverage'
        ],
        // tell karma how you want the coverage results
        coverageReporter: {
            type: 'html',
            // where to store the report
            dir : 'coverage/'
        },


        // web server port
        port: 8080,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};

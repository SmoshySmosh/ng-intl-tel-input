(function () {
    module.exports = function(config) {
        'use strict';

        config.set({
            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,

            // base path, that will be used to resolve files and exclude
            basePath: '',

            // testing framework to use (jasmine/mocha/qunit/...)
            frameworks: [
                'jasmine',
            ],

            // list of files / patterns to load in the browser
            files: [
                // bower:js
                'bower_components/jquery/dist/jquery.js',
                'bower_components/intl-tel-input/build/js/intlTelInput.js',
                'bower_components/intl-tel-input/build/js/utils.js',
                'bower_components/angular/angular.js',
                'bower_components/angular-mocks/angular-mocks.js',
                // endbower
                'src/scripts/ng-intl-tel-input.module.js',
                'src/scripts/ng-intl-tel-input.directive.js',
                'src/scripts/*.spec.js'
            ],

            // list of files / patterns to exclude
            exclude: [
                'app/scripts/**/*.run.js'
            ],

            // web server port
            port: 8080,

            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera
            // - Safari (only Mac)
            // - PhantomJS
            // - IE (only Windows)
            browsers: [
                'PhantomJS',
                //'Chrome',
                //'Firefox'
            ],

            // Which plugins to enable
            plugins: [
                'karma-phantomjs-launcher',
                //'karma-chrome-launcher',
                //'karma-firefox-launcher',
                'karma-jasmine',
                'karma-coverage',
                'karma-spec-reporter',
            ],

            // Coverage Preprocessors
            preprocessors: {
                'src/scripts/**/*.js': ['coverage'],
            },

            // Reporters
            reporters: [
                'coverage',
                'spec'
            ],

            proxies: {},

            // Coverage Reporters
            coverageReporter: {
                reporters: [
                    {
                        type: 'html',
                        dir:  'coverage'
                    },
                    {
                        type: 'text',
                        dir: 'coverage'
                    }
                ]
            },

            // Continuous Integration mode
            // if true, it capture browsers, run tests and exit
            singleRun: false,

            colors: true,

            // level of logging
            // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
            logLevel: config.LOG_INFO,

            // Uncomment the following lines if you are using grunt's server to run the tests
            // proxies: {
            //   '/': 'http://localhost:9000/'
            // },
            // URL root prevent conflicts with the site root
            // urlRoot: '_karma_'

            browserNoActivityTimeout: 20000
        });
    };
})();

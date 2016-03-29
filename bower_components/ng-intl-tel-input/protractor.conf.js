(function () {
    exports.config = {
        baseUrl: 'http://localhost:9001/',
        specs: [
            'src/scripts/*.e2e.js'
        ],
        framework: 'jasmine',
        // Capabilities to be passed to the webdriver instance.
        capabilities: {
            browserName: 'firefox'
        },
        chromeOnly: true,
        allScriptsTimeout: 11000,
        jasmineNodeOpts: {
            defaultTimeoutInterval: 30000
        }
    };
})();

exports.config = {
    specs: [
        './www/app/**/*.spec.js',
        './www/components/**/*.spec.js',
        './www/modules/**/*.spec.js'
    ],

    framework      : 'jasmine',
    seleniumAddress: process.env.SELENIUM_ADDRESS || 'http://localhost:4444/wd/hub',
    // restartBrowserBetweenTests: true,

    capabilities: {
        browserName: 'chrome',
        platform   : 'ANY',
        version    : ''
    },

    jasmineNodeOpts: {
        isVerbose             : true,
        showColors            : true,
        defaultTimeoutInterval: 1200000
    }
};

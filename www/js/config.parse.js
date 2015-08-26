(function () {
    'use strict';
    angular
        .module('starter')
        .value('ParseConfig', {
            applicationId: 'APP_ID',
            clientKey    : 'CLIENTE_KEY',
            javascriptKey: 'JAVASCRIPT_KEY'
        });

})();
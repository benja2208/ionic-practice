(function(){
    'use strict';
    angular
        .module('module.core')
        .service('Parse', function ($window) {
            return $window.Parse;
        });
})();
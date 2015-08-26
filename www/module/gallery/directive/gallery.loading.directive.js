(function () {
    'use strict';
    angular
        .module('module.gallery')
        .directive('galleryLoading', function () {
            return {
                restrict: 'E',
                scope   : {
                    loading: '=',
                    icon   : '@'
                },
                template: '<div class="padding text-center loading" ng-show="loading"><ion-spinner icon="{{ icon }}"></ion-spinner></div>'
            }
        });
})();
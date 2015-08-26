(function () {
    'use strict';
    angular
        .module('module.gallery')
        .directive('ionSearch', function ($timeout) {
            return {
                restrict: 'E',
                replace : true,
                scope   : {
                    getData: '&source',
                    model  : '=?',
                    search : '=?filter'
                },
                template: '<div class="item-input-wrapper">' +
                '<i class="icon ion-android-search"></i>' +
                '<input type="search" placeholder="{{placeholder}}" ng-model="search.value">' +
                '<i ng-if="search.value.length > 0" ng-click="clearSearch()" class="icon ion-close"></i>' +
                '</div>',
                link    : function (scope, element, attrs) {
                    attrs.minLength   = attrs.minLength || 0;
                    scope.placeholder = attrs.placeholder || '';
                    scope.search      = {value: ''};

                    if (attrs.class)
                        element.addClass(attrs.class);

                    if (attrs.source) {
                        scope.$watch('search.value', function (newValue, oldValue) {
                            if (newValue.length > attrs.minLength) {
                                $timeout(function () {
                                    scope
                                        .getData({str: newValue})
                                        .then(function (results) {
                                            scope.model = results;
                                        });
                                }, 1000);
                            } else {
                                scope.model = [];
                            }
                        });
                    }

                    scope.clearSearch = function () {
                        scope.search.value = '';
                    };
                }

            };
        })
})();
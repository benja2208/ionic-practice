(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.user')
    .directive('openTerms', function ($cordovaInAppBrowser) {
      return {
        restrict: 'A',
        template: '',
        link: function (scope, elem, attr) {

          elem.bind('click', function () {
            console.log(scope.ngModel);

            $cordovaInAppBrowser
              .open('http://movibe.github.io/photogram-docs/', '_blank', {
                location: 'no',
                clearcache: 'yes',
                toolbar: 'yes'
              })
              .then(function (event) {
                // success
              })
              .catch(function (event) {
                // error
              });
          });

          scope.closeModal = function () {
            scope.modal.hide();
            scope.modal.remove();
          };
        }
      }
    });
})(window, window.angular);

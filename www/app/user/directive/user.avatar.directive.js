(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.user')
    .directive('userAvatar', function ($ionicModal, PhotoService, User) {
      return {
        restrict: 'A',
        scope: {
          gallery: '@'
        },
        template: '',
        link: function ($scope, elem, attr) {

          elem.bind('click', function () {

            PhotoService
              .open()
              .then(function (imageData) {
                User
                  .updateAvatar(imageData)
                  .then(function (resp) {
                    console.log(resp);
                  });
              })
              .catch(function (resp) {
                console.log(resp);
              });
          });

        }
      }
    });
})(window, window.angular);

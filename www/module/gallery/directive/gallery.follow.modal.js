(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .directive('galleryFollow', function ($ionicModal, $q, Gallery, Loading, $timeout, User, UserForm, $state) {
      return {
        restrict: 'A',
        scope: false,
        link: function (scope, elem, attr) {


          elem.bind('click', function () {

            $ionicModal.fromTemplateUrl('module/gallery/view/gallery.follow.modal.html', {
              scope: scope
            }).then(function (modal) {
              scope.modalProfile = modal;

              //init()
              //  .then(function () {
              //    scope.modalProfile.show();
              //  });
            });
          });


          scope.closeModal = function () {
            scope.modalProfile.hide();
            scope.modalProfile.remove();
          };
        }
      }
    });
})(window, window.angular);

(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .directive('galleryFollow', function ($ionicModal, $q, Gallery, Loading, $timeout, User, UserForm, $state) {
      return {
        restrict: 'A',
        scope: {
          user: '='
        },
        link: function (scope, elem, attr) {


          elem.bind('click', function () {

            $ionicModal.fromTemplateUrl('module/gallery/view/gallery.follow.modal.html', {
              scope: scope
            }).then(function (modal) {
              scope.modalFollow = modal;
              console.log('Open modal follow', scope.user);

              Gallery
                .getFollow(scope.user)
                .then(function (resp) {
                  console.log(resp);
                  scope.data = resp;
                  scope.modalFollow.show();
                });

            });
          });


          scope.closeModal = function () {
            scope.modalFollow.hide();
            scope.modalFollow.remove();
          };
        }
      }
    });
})(window, window.angular);

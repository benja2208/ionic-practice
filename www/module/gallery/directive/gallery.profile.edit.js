(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .directive('galleryProfileEdit', function ($ionicModal, User, UserForm, $state) {
      return {
        restrict: 'A',
        scope: {
          gallery: '@'
        },
        template: '',
        link: function (scope, elem, attr) {

          function init() {
            scope.form = User.currentUser();
            scope.formFields = UserForm.profile;
          }

          elem.bind('click', function () {

            init();
            $ionicModal.fromTemplateUrl('module/gallery/view/gallery.profile.edit.modal.html', {
              scope: scope
            }).then(function (modal) {
              scope.modal = modal;
              scope.modal.show();
            });
          });


          scope.logout = function () {
            $state.go('logout');
            scope.closeModal();
          };

          scope.linkFacebook = function () {
            User
              .facebookLink()
              .then(function (resp) {
                console.log(resp);
              })
          };

          scope.submitUpdateProfile = function () {
            var dataForm = angular.copy(scope.form);
            User
              .update(dataForm)
              .then(function (resp) {
                console.log(resp);
                init();
                scope.closeModal();
              });
          };

          scope.closeModal = function () {
            scope.modal.hide();
            scope.modal.remove();
          };
        }
      }
    });
})(window, window.angular);

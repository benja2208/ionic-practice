(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .directive('gallerySettings', function ($ionicModal, $rootScope, AppConfig, Notify, GalleryShare, User, UserForm,
      $state) {
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
            scope.languages = $rootScope.langs;
            scope.language = $rootScope.lang;
          }

          elem.bind('click', function () {

            init();
            $ionicModal.fromTemplateUrl('module/gallery/view/gallery.settings.modal.html', {
              scope: scope
            }).then(function (modal) {
              scope.modal = modal;
              scope.modal.show();
            });
          });

          scope.link = function (sref) {
            $state.go(sref)
            scope.closeModal();
          };

          scope.changeLanguage = function (language) {
            scope.form.language = language;
            submitUpdateProfile(scope.form);
            $rootScope.setLanguage(language);
          };


          function submitUpdateProfile(form) {
            var dataForm = angular.copy(form);
            User
              .update(dataForm)
              .then(function (resp) {
                console.log(resp);
                init();
                scope.closeModal();
              })
          };

          scope.closeModal = function () {
            scope.modal.hide();
            scope.modal.remove();
          };

          scope.share = GalleryShare.share;

        }
      }
    });
})(window, window.angular);

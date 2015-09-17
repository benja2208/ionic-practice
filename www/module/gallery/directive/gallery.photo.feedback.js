(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .directive('galleryPhotoFeedback', function ($ionicModal, $rootScope, $cordovaSocialSharing, gettextCatalog,
      GalleryFeedback, GalleryFeedbackForm, $state) {
      return {
        restrict: 'A',
        scope: {
          gallery: '@'
        },
        template: '',
        link: function (scope, elem, attr) {

          function init() {
            scope.form = {
              galleryId: scope.gallery
            };
            scope.formFields = GalleryFeedbackForm.form;
          }

          elem.bind('click', function () {

            init();
            $ionicModal.fromTemplateUrl('module/gallery/view/gallery.photo.feedback.modal.html', {
              scope: scope,
              focusFirstInput: true
            }).then(function (modal) {
              scope.modal = modal;
              scope.modal.show();
            });
          });

          scope.link = function (sref) {
            $state.go(sref)
            scope.closeModal();
          };


          scope.submitFeedback = function () {
            var dataForm = angular.copy(scope.form);
            GalleryFeedback
              .submit(dataForm)
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

        }
      }
    });
})(window, window.angular);

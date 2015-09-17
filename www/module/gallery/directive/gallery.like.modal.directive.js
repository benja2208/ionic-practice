(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .directive('galleryLikeModal', function ($ionicModal, Gallery) {
      return {
        restrict: 'A',
        scope: {
          gallery: '='
        },
        template: '',
        link: function (scope, elem, attr) {
          elem.bind('click', function () {
            console.log(scope.gallery);

            $ionicModal.fromTemplateUrl('module/gallery/view/gallery.like.directive.html', {
              scope: scope,
              animation: 'slide-in-up'
            }).then(function (modal) {
              scope.modal = modal;
            });

          });


          scope.formFields = Gallery.formComment;
          scope.submitComment = function (rForm, form) {
            if (rForm.$valid) {
              var dataForm = angular.copy(form);
              Gallery
                .addComment(dataForm)
                .then(function (resp) {
                  console.log(resp);
                  scope.closeModal();
                });
            }
          };

          scope.closeModal = function () {
            scope.modal.hide();
            scope.modal.remove();
          };

        }
      }
    });
})(window, window.angular);

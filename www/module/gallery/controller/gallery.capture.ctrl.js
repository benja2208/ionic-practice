(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .controller('GalleryCaptureCtrl', function ($scope, User, $ionicModal, PhotoService, GallerySetting, ParseImageService, $state, Gallery, GalleryForm, Loading) {

      $scope.map = {
        center: {
          center: {
            latitude: 45,
            longitude: -73
          },
          zoom: 13
        }
      };

      function init() {
        $scope.form = {
          title: '',
          geo: {},
          photo: ''
        };

        $scope.data = '';
      }

      function getLocation() {

        if ($scope.form.location === '') {
          User
            .location()
            .then(function (position) {

              $scope.here = position;
              $scope.form.location = position;
              $scope.map.center = position;
              $scope.loading = false;

              console.log($scope.form);
              console.log($scope.here);
              console.log(position);
            }, function (err) {
              // error
              console.log(err);
            });
        }


      };


      $scope.getGeo = function (resp) {
        if (resp) getLocation();
      };

      $scope.formFields = Gallery.form;
      $scope.formShareFields = GalleryForm.formShare;

      $scope.open = function () {
        init();
        PhotoService
          .open({
            quality: GallerySetting.get('imageQuality'),
            allowEdit: GallerySetting.get('imageEdit'),
            correctOrientation: GallerySetting.get('imageEdit'),
            targetWidth: GallerySetting.get('imageWidth'),
            targetHeight: GallerySetting.get('imageHeight'),
            saveToPhotoAlbum: GallerySetting.get('imageSaveAlbum')
          })
          .then(function (resp) {

            $scope.data = 'data:image/jpeg;base64,' + resp;
            $scope.form.photo = resp;

            $ionicModal.fromTemplateUrl('module/gallery/view/gallery.capture.modal.html', {
              scope: $scope,
              focusFirstInput: true
            }).then(function (modal) {
              $scope.modal = modal;
              $scope.modal.show();
            });

            $scope.closeModal = function () {
              $scope.modal.hide();
              $scope.modal.remove();
            };
          })
          .catch(function () {
            $state.go('gallery.home');
          });
      };

      $scope.open();

      $scope.submitCapture = function () {
        var dataForm = angular.copy($scope.form);
        var shareForm = angular.copy($scope.formShare);

        console.log($scope.form);
        if ($scope.form.geo) {
          dataForm.location = $scope.form.geo.coords;
        }

        console.log(shareForm);
        Loading.start();

        Gallery
          .add(dataForm)
          .then(function (resp) {
            $state.go('gallery.home', {
              reload: true
            });
            $scope.closeModal();
            init();
            Loading.end();
          });
      };

    });
})(window, window.angular);

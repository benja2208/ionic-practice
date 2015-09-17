(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .directive('galleryPhotoCapture', function ($ionicModal, $cordovaGeolocation, Loading, $state, PhotoService,
      Gallery) {
      return {
        restrict: 'A',
        scope: {
          gallery: '@'
        },
        transclude: false,
        link: function (scope, elem, attr) {

          function init() {
            scope.loading = true;
            scope.comments = [];
            Gallery
              .getComments(scope.gallery)
              .then(function (resp) {
                scope.comments = resp;
                scope.loading = false;
              });

            scope.form = {
              galleryId: scope.gallery,
              text: ''
            };
          }

          elem.bind('click', function () {
            console.log(scope.gallery);


            $ionicModal.fromTemplateUrl('module/gallery/view/gallery.capture.modal.html', {
              scope: scope
            }).then(function (modal) {
              scope.modal = modal;
              scope.modal.show();
            });
          });


          function init() {
            scope.active = false;
            scope.form = {
              title: '',
              location: '',
              photo: '',
              geo: false
            };

            scope.map = {
              center: {
                latitude: -23.5333333,
                longitude: -46.6166667
              },
              scrollwheel: false,
              zoom: 15
            };
            scope.data = '';
            scope.loading = false;

          }

          function getLocation() {
            var posOptions = {
              timeout: 10000,
              enableHighAccuracy: false
            };

            if (scope.form.location === '') {

              scope.loading = false;

              $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {

                  scope.here = {
                    id: 1,
                    coords: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                    },
                    icon: 'img/pin.png'
                  };

                  scope.form.location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  };

                  scope.map.center = scope.here.coords;
                  scope.loading = false;

                  console.log(scope.form);
                  console.log(scope.here);
                  console.log(position);
                }, function (err) {
                  // error
                });
            }


          };


          scope.getGeo = function (resp) {
            if (resp) getLocation();
          };

          scope.formFields = Gallery.form;

          scope.open = function () {
            init();
            PhotoService
              .open()
              .then(function (resp) {
                scope.loading = false;
                scope.active = true;
                scope.form.photo = resp;
                scope.data = 'data:image/jpeg;base64,' + resp;
                // angular.element ('.title').focus ();
              })
              .catch(function () {
                $state.go('gallery.home');
              });
          };


          scope.submitCapture = function (form) {
            var dataForm = angular.copy(scope.form);
            Loading.start();
            Gallery
              .add(dataForm)
              .then(function (resp) {
                $state.go('gallery.home', {
                  reload: true
                });
                init();
                Loading.end();
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

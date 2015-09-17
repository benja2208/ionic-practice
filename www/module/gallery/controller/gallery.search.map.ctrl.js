(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .controller('GallerySearchMapCtrl', function ($scope, $timeout, User, GeoService, Gallery) {
      var vm = this;

      $scope.map = {
        center: {
          latitude: 45,
          longitude: -73
        },
        zoom: 13
      };

      vm.location = function () {
        init();
      };

      var time = 0;

      $scope.$watch('map.center.latitude', function (newValue, oldValue) {
        console.log(newValue);
        if (newValue) {
          console.log(newValue);
          time += 2000;
          console.log(time);


          var timer = $timeout(function () {
            console.log(timer);

            Gallery
              .nearby($scope.map.center)
              .then(function (resp) {
                console.log(resp);
                time = 0;
                vm.data = resp;

                $timeout.cancel(timer);
              });
          }, time);

        }
      });

      vm.openModal = function (item) {
        console.log(item);
      };

      function init() {
        GeoService
          .findMe()
          .then(function (position) {

            console.log(position);

            $scope.map = {
              center: position.geolocation,
              zoom: 13
            };

            vm.user = angular.copy(position.geolocation);

            Gallery
              .nearby(position.coords)
              .then(function (resp) {
                console.log(resp);
                vm.data = resp;
              });

          }, function (error) {
            console.log('Could not get location');

            Gallery
              .nearby($scope.map.center)
              .then(function (resp) {
                console.log(resp);
                vm.data = resp;
              });
          });
      }

      init();

    });
})(window, window.angular);

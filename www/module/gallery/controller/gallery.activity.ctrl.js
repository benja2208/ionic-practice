(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .controller('GalleryActivityCtrl', function ($scope, Gallery) {
      var vm = this;
      vm.loading = true;

      function init() {
        vm.page = 0;
        vm.data = [];
        vm.empty = false;
        vm.loadMore = false;
      }

      init();

      $scope.loadMore = function (force) {
        console.log('Load More');
        vm.load(force);
      };

      vm.load = function (force) {

        if (force) {
          init();
        }

        Gallery
          .listActivity(vm.page)
          .then(function (resp) {
            console.log(resp);
            angular.forEach(resp, function (value, key) {
              vm.data.push(value);
            });

            console.log('qtd', resp.length);
            if (resp.length) {
              vm.loading = false;
              vm.more = true;
              vm.page++;
            } else {
              vm.empty = true;
              vm.loading = false;
              vm.more = false;
            }
          })
          .then(function () {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');

          })
          .catch(function () {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            if (vm.data.length) {
              vm.loading = false;
              vm.page++;
            } else {
              vm.empty = true;
              vm.loading = false;
            }
            vm.more = false;
          });
      };

      vm.load();

    });
})(window, window.angular);

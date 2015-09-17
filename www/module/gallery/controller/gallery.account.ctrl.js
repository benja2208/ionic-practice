(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .controller('GalleryAccountCtrl', function ($scope, $rootScope, $stateParams, Gallery) {

      var vm = this;
      vm.loading = true;
      vm.empty = false;
      vm.data = [];
      vm.tab = 'grid';

      Gallery
        .getUser($rootScope.user.id)
        .then(function (resp) {
          vm.form = resp;
          if (vm.form.galleries > 9) {
            getGallery();
          } else {
            vm.loading = false;
            vm.empty = true;
          }
        });


      function getGallery() {
        Gallery
          .getUserGallery($rootScope.user.id)
          .then(function (resp) {
            vm.data = resp;
            console.log(resp);
          })
          .then(function () {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            vm.loading = false;
          });
      }


    });
})(window, window.angular);

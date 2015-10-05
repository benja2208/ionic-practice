(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .controller('GalleryAccountCtrl', function ($scope, $rootScope, $stateParams, User, Gallery) {

      var vm = this;
      vm.loading = true;
      vm.empty = false;
      vm.data = [];
      vm.tab = 'grid';

      var user = $rootScope.user;

      function getGallery() {

        Gallery
          .getUserGallery(user.id)
          .then(function (resp) {
            vm.data = resp;
            console.log(resp);
          })
          .then(function () {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            vm.loading = false;
          })
          .catch(function () {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
            vm.loading = false;
          });
      }

      function getFollower(userId) {
        $scope.loadingFollowers = true;
        $scope.loadingFollowing = true;
        $scope.loadingPhotos = true;

        Gallery
          .getUserGalleryQtd(userId)
          .then(function (qtdPhotos) {
            console.log('qtdPhotos', qtdPhotos);
            user.qtdPhotos = qtdPhotos;
            $scope.loadingPhotos = false;
            if (qtdPhotos > 0) {
              getGallery();
              console.log('Load photo');
            } else {
              console.log('No photo');
              vm.empty = true;
              vm.loading = false;
            }
          });

        User
          .getFollowers(userId)
          .then(function (qtdFollowers) {
            console.log('qtdFollower: seguindo', qtdFollowers);
            user.qtdFollowers = qtdFollowers;
            $scope.loadingFollowers = false;
          });

        User
          .getFollowing(userId)
          .then(function (qtdFollowing) {
            console.log('qtdFollowing: seguidores', qtdFollowing);
            user.qtdFollowing = qtdFollowing;
            $scope.loadingFollowing = false;
          });
      }

      getFollower();


    });
})(window, window.angular);

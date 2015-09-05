(function(){
    'use strict';
    angular
        .module('module.gallery')
        .controller('GalleryAccountCtrl', function ($scope, $rootScope, $stateParams, Gallery) {

            var vm     = this;
            vm.loading = true;
            vm.data    = [];
            vm.tab     = 'grid';

            Gallery
                .getUser($rootScope.user.id)
                .then(function (resp) {
                    vm.form = resp;
                });

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


        });
})();

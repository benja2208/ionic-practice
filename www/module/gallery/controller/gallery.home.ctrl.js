(function () {
    'use strict';
    angular
        .module('module.gallery')
        .controller('GalleryHomeCtrl', function ($scope, $ionicPopover, $stateParams, PhotoService, Gallery, $timeout) {
            var vm      = this;
            vm.page     = -1;
            vm.active   = false;
            vm.data     = [];
            vm.loading  = true;
            $scope.like = false;


            $scope.loadMore = function (force) {
                console.log('Load More');
                vm.load(force);
            }

            vm.load = function (force) {
                console.log('Load ');
                vm.loading = true;
                if (force) {
                    vm.data = [];
                    vm.page = -1;
                }

                vm.page = parseInt(vm.page) + 1;

                Gallery
                    .all(vm.page)
                    .then(function (resp) {
                        console.log(resp);
                        angular.forEach(resp, function (value, key) {
                            vm.data.push(value);
                        });
                    })
                    .then(function () {
                        $scope.$broadcast('scroll.refreshComplete');
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        vm.loading = false;
                    })
                    .catch(function () {
                        vm.loading = false;
                    });
            };

            vm.load($stateParams.reload);

        });
})();
(function () {
    'use strict';
    angular
        .module('module.gallery')
        .controller('GalleryHomeCtrl', function ($scope, $ionicPopover, $stateParams, PhotoService, Gallery, $timeout) {
            var vm      = this;
            vm.loading  = true;
            $scope.like = false;


            function init() {
                vm.data = [];
                vm.page = 0;
            }

            init();

            $scope.loadMore = function (force) {
                console.log('Load More');
                vm.load(force);
            }

            vm.load = function (force) {
                console.log('Load ');
                vm.loading = true;

                if (force) {
                    init();
                }

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
                        vm.page++;
                    })
                    .catch(function () {
                        vm.loading = false;
                    });
            };

            vm.load($stateParams.reload);

        });
})();
(function () {
    'use strict';
    angular
        .module('module.gallery')
        .controller('GalleryActivityCtrl', function ($scope, Gallery) {
            var vm     = this;
            vm.loading = true;

            function init() {
                vm.page = 0;
                vm.data = [];
            }

            init();

            vm.load = function () {
                Gallery
                    .listActivity(vm.page)
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

            vm.load();

        });
})();
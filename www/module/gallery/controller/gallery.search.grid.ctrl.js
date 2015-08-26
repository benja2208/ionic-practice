(function(){
    'use strict';
    angular
        .module('module.gallery')
        .controller('GallerySearchGridCtrl', function ($scope, Gallery) {
            var vm     = this;
            vm.loading = true;

            vm.search = function (string) {
                Gallery
                    .search(string)
                    .then(function (resp) {
                        vm.data = resp;
                        console.log(resp);
                    })
                    .then(function () {
                        $scope.$broadcast('scroll.refreshComplete');
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                        vm.loading = false;
                    });
            };

            vm.search();

        });
})();
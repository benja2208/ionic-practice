(function () {
    'use strict';
    angular
        .module('module.gallery')
        .controller('GallerySearchMapCtrl', function ($scope, User, Gallery) {
            var vm = this;

            $scope.map = {
                center: {
                    latitude : 45,
                    longitude: -73
                },
                zoom  : 13
            };

            vm.location = function () {
                init();
            };

            $scope.$watch('map.center.latitude', function (newValue, oldValue) {
                console.log(newValue);
                if (newValue) {
                    console.log(newValue);
                    Gallery
                        .nearby($scope.map.center)
                        .then(function (resp) {
                            console.log(resp);
                            vm.data = resp;
                        });
                }
            });


            function init() {
                User
                    .location()
                    .then(function (position) {

                        console.log(position);

                        $scope.map = {
                            center: {
                                latitude : position.latitude,
                                longitude: position.longitude,
                            },
                            zoom  : 13
                        };

                        vm.user = {
                            latitude : position.latitude,
                            longitude: position.longitude,
                        };

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
})();
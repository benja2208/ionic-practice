(function () {
    'use strict';
    angular
        .module('module.gallery')
        .controller('GalleryProfileCtrl', function ($rootScope, $stateParams, Gallery, UserForm, User) {

            console.log($stateParams);

            var vm = this;

            function init() {
                Gallery
                    .getUser($stateParams.id)
                    .then(function (resp) {
                        vm.form = resp;
                    });
            }

            init();
        });
})();
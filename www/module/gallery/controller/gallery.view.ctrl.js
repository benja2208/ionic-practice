(function(){
    'use strict';
    angular
        .module('module.gallery')
        .controller('GalleryViewCtrl', function (Gallery, $stateParams) {
            var vm = this;
            Gallery
                .get($stateParams.id)
                .then(function (resp) {
                    console.log(resp);
                    vm.data = resp;
                });
        });
})();
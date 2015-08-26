(function(){
    'use strict';
    angular
        .module('module.gallery')
        .controller('GalleryPreviewCtrl', function (photo, Gallery, $stateParams) {
            var vm  = this;
            vm.data = photo;
            console.log(photo);
        });
})();
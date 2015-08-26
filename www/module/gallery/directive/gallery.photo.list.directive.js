(function(){
    'use strict';
    angular
        .module('module.gallery')
        .directive('galleryPhotoList', function () {
            return {
                restrict   : 'E',
                scope      : {
                    data   : '=gallery',
                    loading: '='
                },
                templateUrl: 'module/gallery/view/gallery.photos.list.html',
                link       : function (scope, elem, attr) {

                }
            }
        });
})();
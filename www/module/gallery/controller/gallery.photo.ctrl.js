(function(){
    'use strict';
    angular
        .module('module.gallery')
        .controller('GalleryPhotoCtrl', function ($stateParams, Gallery) {
            var vm = this;

            function init() {
                vm.form = {
                    galleryId: $stateParams.id,
                    text     : ''
                };

                loadComments();
            }

            vm.formFields = Gallery.formComment;

            Gallery
                .get($stateParams.id)
                .then(function (resp) {
                    vm.data = resp;
                });

            function loadComments() {
                Gallery
                    .allComment($stateParams.id)
                    .then(function (resp) {
                        console.log(resp);
                        vm.comments = resp;
                    });
            };

            init();

            vm.submitComment = function (rForm, form) {
                if (rForm.$valid) {
                    var dataForm = angular.copy(form);
                    Gallery
                        .addComment(dataForm)
                        .then(function (resp) {
                            console.log(resp);
                            loadComments();
                        });
                }
            };

        });
})();
(function () {
    'use strict';
    angular
        .module('module.gallery')
        .factory('GalleryFeedback', function (Parse, $q, Gallery, Notify, gettextCatalog) {

            function submit(form) {
                var defer = $q.defer();

                console.log(form);

                Gallery
                    .find(form.galleryId)
                    .then(function (gallery) {
                        console.log(gallery);
                        var Object = Parse.Object.extend('GalleryFeedback');
                        var item   = new Object();

                        delete form.galleryId;

                        angular.forEach(form, function (value, key) {
                            item.set(key, value);
                        });

                        item.set('user', Parse.User.current());
                        item.set('gallery', gallery);

                        item
                            .save(null)
                            .then(function (resp) {
                                Notify.alert({
                                    title: gettextCatalog.getString('Thanks'),
                                    text : gettextCatalog.getString('Thanks for your Feedback')
                                })
                                defer.resolve(resp);
                            });
                    })


                return defer.promise;
            }

            return {
                submit: submit
            }

        });
})();
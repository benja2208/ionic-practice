(function (window, angular, undefined) {
    'use strict';
    angular
        .module('module.gallery')
        .config(function ($stateProvider) {
            $stateProvider

                .state('userlist', {
                    url        : '/follow',
                    controller: 'GalleryUserListCtrl as GalleryUserList',
                    templateUrl: 'module/gallery/view/gallery.user.list.html'
                })


                .state('gallery', {
                    url        : '/gallery',
                    abstract: true,
                    templateUrl: 'module/gallery/view/gallery.tabs.html'
                })

                .state('gallery.home', {
                    url  : '/home',
                    views: {
                        tabHome: {
                            controller : 'GalleryHomeCtrl as GalleryHome',
                            templateUrl: 'module/gallery/view/gallery.home.html'
                        }
                    }
                })

                .state('gallery.popular', {
                    url  : '/popular',
                    views: {
                        tabPopular: {
                            controller : 'GalleryPopularCtrl as GalleryPopular',
                            templateUrl: 'module/gallery/view/gallery.popular.html'
                        }
                    }
                })

                .state('gallery.capture', {
                    url  : '/capture',
                    views: {
                        tabCapture: {
                            controller : 'GalleryCaptureCtrl as GalleryCapture',
                            templateUrl: 'module/gallery/view/gallery.capture.html'
                        }
                    }
                })

                .state('gallery.search', {
                    url     : '/search',
                    abstract: true,
                    views   : {
                        tabSearch: {
                            templateUrl: 'module/gallery/view/gallery.search.tabs.html'
                        }
                    }
                })

                .state('gallery.search.grid', {
                    url  : '/grid',
                    views: {
                        tabGrid: {
                            controller : 'GallerySearchGridCtrl as GallerySearchGrid',
                            templateUrl: 'module/gallery/view/gallery.search.grid.html'
                        }
                    }
                })
                .state('gallery.search.map', {
                    url  : '/map',
                    views: {
                        tabMap: {
                            controller : 'GallerySearchMapCtrl as GallerySearchMap',
                            templateUrl: 'module/gallery/view/gallery.search.map.html'
                        }
                    }
                })



                .state('gallery.activity', {
                    url  : '/activity',
                    views: {
                        tabActivity: {
                            controller : 'GalleryActivityCtrl as GalleryActivity',
                            templateUrl: 'module/gallery/view/gallery.activity.html'
                        }
                    }
                })

                .state('gallery.account', {
                    url  : '/account',
                    views: {
                        tabProfile: {
                            controller : 'GalleryAccountCtrl as GalleryProfile',
                            templateUrl: 'module/gallery/view/gallery.account.html'
                        }
                    }
                })

            ;
        });
})(window, window.angular);

(function () {
    'use strict';
    angular
        .module('module.gallery')
        .config(function ($stateProvider) {
            $stateProvider

                .state('userlist', {
                    url        : '/users',
                    controller : 'GalleryUserListCtrl as GalleryUserList',
                    templateUrl: 'module/gallery/view/gallery.user.list.html'
                })


                .state('gallery', {
                    url        : '/gallery',
                    abstract   : true,
                    templateUrl: 'module/gallery/view/gallery.tabs.html'
                })

                .state('gallery.home', {
                    url  : '/home/:reload',
                    views: {
                        tabHome: {
                            controller : 'GalleryHomeCtrl as GalleryHome',
                            templateUrl: 'module/gallery/view/gallery.home.html'
                        }
                    }
                })
                .state('gallery.photo', {
                    url  : '/home/:id',
                    views: {
                        tabHome: {
                            controller : 'GalleryPhotoCtrl as GalleryPhoto',
                            templateUrl: 'module/gallery/view/gallery.photo.html'
                        }
                    }
                })

                .state('gallery.profile', {
                    url  : '/profile/:id',
                    //abstract: true,
                    views: {
                        tabHome: {
                            controller : 'GalleryProfileCtrl as GalleryProfile',
                            templateUrl: 'module/gallery/view/gallery.profile.tabs.html'
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
                            templateUrl: 'module/gallery/view/gallery.account.tabs.html'
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


            ;
        });
})();
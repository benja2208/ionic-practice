(function () {
    'use strict';
    angular
        .module('module.user')
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('router', {
                    url        : '/',
                    templateUrl: 'app/core/view/loading.html',
                    controller : function ($state) {
                        if (window.Parse.User.current()) {
                            $state.go('gallery.home.normal', {clear: true});
                        } else {
                            $state.go('intro', {clear: true});
                        }
                    }
                })


                .state('intro', {
                    url        : '/intro',
                    templateUrl: 'app/user/view/user.intro.html',
                    controller : 'IntroCtrl as Intro'
                })

                .state('user', {
                    url        : '/user',
                    abstract   : true,
                    templateUrl: 'app/user/view/user.tabs.html'
                })

                .state('user.login', {
                    url  : '/login',
                    views: {
                        tabLogin: {
                            controller : 'LoginCtrl as Login',
                            templateUrl: 'app/user/view/user.login.html'
                        }
                    }
                })

                .state('user.register', {
                    url  : '/register',
                    views: {
                        tabLogin: {
                            controller : 'RegisterCtrl as Register',
                            templateUrl: 'app/user/view/user.register.html'
                        }
                    }
                })

                .state('useravatar', {
                    url     : '/avatar',
                    controller: 'UserAvatarCtrl as Avatar',
                    templateUrl: 'app/user/view/user.avatar.html'
                })

                .state('logout', {
                    url       : '/logout',
                    template  : '<ion-view view-title="Logout" cache-view="false"><ion-content></ion-content></ion-view>',
                    controller: function (User, $state) {
                        User.logout();
                    }
                })
            ;

            $urlRouterProvider.otherwise('/');

        });

})();
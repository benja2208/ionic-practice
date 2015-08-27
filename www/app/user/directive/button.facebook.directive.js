(function () {
    'use strict';
    angular
        .module('module.user')
        .config(function ($provide) {
            'use strict';

            var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

            if (isSafari) {
                $provide.decorator('$rootScope', function ($rootScope) {
                    var scopePrototype   = Object.getPrototypeOf($rootScope);
                    var originalScopeNew = scopePrototype.$new;
                    scopePrototype.$new  = function () {
                        try {
                            return originalScopeNew.apply(this, arguments);
                        } catch (e) {
                            console.error(e);
                            throw e;
                        }
                    };
                    return $rootScope;
                });
            }
        })
        .directive('buttonFacebook', function (User, Gallery, Loading, $state, $q, $timeout, gettextCatalog, $cordovaFacebook, $window, $log) {
            return {
                restrict: 'E',
                template: '<button class="button button-block button-facebook" ><i class="icon ion-social-facebook"></i> {{ msg }} </button>',
                scope   : {
                    login   : '@',
                    register: '@',
                },
                link    : function ($scope, elem, attr) {
                    $scope.msg = gettextCatalog.getString('Conect your Facebook');

                    var route = 'gallery.home.normal';

                    function loginroute() {
                        Loading.end();
                        User.init();
                        $timeout(function () {
                            $state.go(route, {clear: true});
                        }, 500);
                    }

                    function newUser(response) {
                        var form = {
                            name       : response.name,
                            facebook   : response.id,
                            facebookimg: 'https://graph.facebook.com/' + response.id + '/picture?width=250&height=250'
                        };

                        User
                            .update(form)
                            .then(function () {
                                Gallery
                                    .addActivity({
                                        action: 'registered'
                                    });
                                loginroute();
                                $log.warn('me response', response);
                            });
                    }

                    function login(user) {
                        $log.info('user exist', user.existed());
                        if (!user.existed()) {
                            $log.warn('New user using Facebook!', user);
                            if (!($window.ionic.Platform.isIOS() || $window.ionic.Platform.isAndroid())) {
                                $log.info('facebook browser');
                                $window
                                    .FB
                                    .api('/me', function (response) {
                                        newUser(response);
                                    });
                            } else {
                                $log.info('facebook native');
                                $cordovaFacebook
                                    .api('/me', ['public_profile'])
                                    .then(function (response) {
                                        newUser(response);
                                    });
                            }
                        } else {
                            $log.warn('User logged Facebook!', user);
                            loginroute();
                        }
                    }

                    elem.bind('click', function () {

                        Loading.start();
                        //Browser Login
                        if (!($window.ionic.Platform.isIOS() || $window.ionic.Platform.isAndroid())) {
                            $log.info('login browser');
                            $window
                                .Parse
                                .FacebookUtils
                                .logIn(null, {
                                    success: function (user) {
                                        $log.log('user1', user);
                                        login(user);
                                    },
                                    error  : function (user, error) {
                                        $log.error('User cancelled the Facebook login or did not fully authorize.');
                                    }
                                });

                        } else {
                            //Native Login
                            $log.info('Login cordova');
                            $cordovaFacebook
                                .login([
                                    'public_profile',
                                    'email'
                                ])
                                .then(function (success) {

                                    $log.log('cordova1', success);

                                    //Need to convert expiresIn format from FB to date
                                    var expiration_date = new Date();
                                    expiration_date.setSeconds(expiration_date.getSeconds() + success.authResponse.expiresIn);
                                    expiration_date     = expiration_date.toISOString();

                                    var facebookAuthData = {
                                        id             : success.authResponse.userID,
                                        access_token   : success.authResponse.accessToken,
                                        expiration_date: expiration_date
                                    };

                                    $window
                                        .Parse
                                        .FacebookUtils
                                        .logIn(facebookAuthData, {
                                            success: function (user) {
                                                $log.log('user3', user);
                                                login(user);
                                            },
                                            error  : function (user, error) {
                                                alert("User cancelled the Facebook login or did not fully authorize.");
                                            }
                                        });

                                }, function (error) {
                                    $log.log(error);
                                });

                        }
                    });
                }
            }
        });
})();
(function () {
    'use strict';
    angular
        .module('starter', [
            'ionic','ionic.service.core','ionic.service.analytics',
            //'cacheapp',
            //'cachemodule',
            'formlyIonic',
            'pascalprecht.translate',
            'angularMoment',
            'ionic.components',
            'ngFacebook',
            'translate.app',
            'translate.form',
            'angular-cache',
            'uiGmapgoogle-maps',
            'ngCordova',
            'gettext',
            'module.core',
            'module.user',
            'module.gallery'
        ])

        .run(function ($ionicPlatform, $ionicAnalytics, $rootScope, $window, $cordovaStatusbar, $timeout, $cordovaSplashscreen, GallerySetting, User) {

            User.init();
            GallerySetting.init();

            $ionicPlatform.ready(function () {

                $ionicAnalytics.register();

                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                }

                if (window.cordova) {
                    $timeout(function () {
                        $cordovaSplashscreen.hide();
                        $cordovaStatusbar.overlaysWebView(true);
                        $cordovaStatusbar.style(1);
                        $cordovaStatusbar.styleHex('#00796B');
                        $cordovaStatusbar.show();
                    }, 500);
                }

            });


        })
        .run(function ($rootScope, gettextCatalog, $translate, amMoment) {
            // Language
            $rootScope.langs = [
                {
                    name : gettextCatalog.getString('English'),
                    value: 'en_US'
                },
                {
                    name : gettextCatalog.getString('Portuguese Brazil'),
                    value: 'pt_BR'
                }
            ];

            var LangVar     = navigator.language || navigator.userLanguage;
            var userLangVar = LangVar.substring(0, 2) + '_' + LangVar.substring(3, 5).toUpperCase();

            $rootScope.setLanguage = function (language) {

                $rootScope.lang = $rootScope.langs.filter(function (item) {
                    return item.value == language;
                })[0];

                gettextCatalog.setCurrentLanguage(language);
                $translate.use(language);
                amMoment.changeLocale(language);
            };

            $rootScope.setLanguage(userLangVar);
            console.info(LangVar, userLangVar);
        })
        .config(function ($ionicConfigProvider) {
            //$ionicConfigProvider.platform.ios.backButton.previousTitleText(' ').icon('ion-ios-arrow-left');
            //$ionicConfigProvider.platform.android.backButton.previousTitleText(' ').icon('ion-ios-arrow-left');
            //$ionicConfigProvider.views.swipeBackEnabled (true);
            $ionicConfigProvider.backButton.text(' ').icon('ion-ios-arrow-left');
            //$ionicConfigProvider.backButton.previousTitleText (false).text ('Voltar').icon ('ion-ios-arrow-left');
            //$ionicConfigProvider.views.transition ('platform');
            //$ionicConfigProvider.navBar.alignTitle ('platform');
            //$ionicConfigProvider.tabs.position('bottom');
            $ionicConfigProvider.platform.android.tabs.position('bottom');
            $ionicConfigProvider.platform.android.tabs.style('standard');

            // Android Native Scroll
            console.log('android: scroll nativo', $ionicConfigProvider.scrolling.jsScrolling());
            if(ionic.Platform.isAndroid()) $ionicConfigProvider.scrolling.jsScrolling(false);
            $ionicConfigProvider.views.maxCache(1);
        });

})();
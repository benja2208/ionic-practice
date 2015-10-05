(function (window, angular, cordova, navigator, undefined) {
  'use strict';
  angular
    .module('starter', [
      'ionic', 'ionic.service.core',

      'ionic.service.analytics',
      //'cacheapp',
      //'cachemodule',
      'ionic-cache-src',
      'formlyIonic',
      'pascalprecht.translate',
      'angularMoment',
      'ionic.components',
      'ngFacebook',
      'translate.app',
      'translate.form',
      'angular-cache',
      'ngCordova',
      'gettext',
      'module.core',
      'module.user',
      'module.gallery'
    ])


  .run(function ($ionicPlatform, $cacheSrc, AppConfig, $ionicAnalytics, $rootScope, $window, $cordovaStatusbar,
      $timeout, $cordovaSplashscreen, GallerySetting, User) {

      $cacheSrc.color = AppConfig.color;
      $cacheSrc.bgcolor = '#ddd';
      $cacheSrc.rounded = true;
      $cacheSrc.radius = 50;
      //$cacheSrc.interval = 5000;

      User.init();
      GallerySetting.init();

      $ionicPlatform.ready(function () {

        $ionicAnalytics.register();

        if (cordova && cordova.plugins && cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }

        if (cordova) {
          $timeout(function () {
            $cordovaSplashscreen.hide();
            $cordovaStatusbar.overlaysWebView(true);
            $cordovaStatusbar.style(1);
            $cordovaStatusbar.styleHex(AppConfig.color);
            $cordovaStatusbar.show();
          }, 500);
        }

      });


    })
    .run(function ($rootScope, gettextCatalog, $translate, amMoment) {
      // Language
      $rootScope.langs = [{
        name: gettextCatalog.getString('English'),
        value: 'en_US'
      }, {
        name: gettextCatalog.getString('Portuguese Brazil'),
        value: 'pt_BR'
      }];

      var LangVar = navigator.language || navigator.userLanguage;
      var userLangVar = LangVar.substring(0, 2) + '_' + LangVar.substring(3, 5)
        .toUpperCase();

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
      $ionicConfigProvider.backButton.text(' ')
        .icon('ion-ios-arrow-left');
      //$ionicConfigProvider.backButton.previousTitleText (false).text ('Voltar').icon ('ion-ios-arrow-left');
      //$ionicConfigProvider.views.transition ('platform');
      //$ionicConfigProvider.navBar.alignTitle ('platform');
      //$ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.views.maxCache(1);
      // Android Native Scroll
      var jsScrolling = (ionic.Platform.isAndroid()) ? false : true;
      $ionicConfigProvider.scrolling.jsScrolling(jsScrolling);
    });


})(window, window.angular, window.cordova, window.navigator);

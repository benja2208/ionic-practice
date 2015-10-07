(function (window, angular, ionic, undefined) {
  'use strict';
  angular
    .module('starter')
    .config(function ($facebookProvider, AppConfig) {
      $facebookProvider.setAppId(AppConfig.facebook);
      $facebookProvider.setPermissions('id,name,email,user_likes,bio');
    })
    .run(function () {
      if (!(ionic.Platform.isIOS() || ionic.Platform.isAndroid())) {
        var LangVar = window.navigator.language || window.navigator.userLanguage;
        var userLangVar = LangVar.substring(0, 2) + '_' + LangVar.substring(3, 5).toUpperCase();
        // If we've already installed the SDK, we're done
        if (document.getElementById('facebook-jssdk')) {
          return;
        }

        // Get the first script element, which we'll use to find the parent node
        var firstScriptElement = document.getElementsByTagName('script')[0];

        // Create a new script element and set its id
        var facebookJS = document.createElement('script');
        facebookJS.id = 'facebook-jssdk';

        // Set the new script's source to the source of the Facebook JS SDK
        facebookJS.src = 'http://connect.facebook.net/' + userLangVar + '/all.js';

        // Insert the Facebook JS SDK into the DOM
        firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
      }
    });
})(window, window.angular, window.ionic);

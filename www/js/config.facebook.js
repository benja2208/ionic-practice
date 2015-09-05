(function () {
    'use strict';
    angular
        .module('starter')
        .config(function ($facebookProvider, AppConfig) {
            $facebookProvider.setAppId(AppConfig.facebook);
        })
        .run(function ($window, AppConfig) {
            // Load the Parse Facebook SDK asynchronously
            if (!($window.ionic.Platform.isIOS() || $window.ionic.Platform.isAndroid())) {
                $window.fbAsyncInit = function () {
                    $window.Parse.FacebookUtils.init({
                        appId  : AppConfig.facebook,
                        version: 'v2.3',
                        status : true,                                 // Check Facebook Login status
                        xfbml  : true                                  // Look for social plugins on the page
                    });
                };

                (function (d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {
                        return;
                    }
                    js              = d.createElement(s);
                    js.id           = id;
                    var LangVar     = navigator.language || navigator.userLanguage;
                    var userLangVar = LangVar.substring(0, 2) + '_' + LangVar.substring(3, 5).toUpperCase();
                    // Set the new script's source to the source of the Facebook JS SDK
                    js.src = 'http://connect.facebook.net/' + userLangVar + '/all.js';
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }
        });
})();

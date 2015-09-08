(function () {
    'use strict';
    angular
        .module('starter')
        .config(function ($facebookProvider, AppConfig) {
            $facebookProvider.setAppId(AppConfig.facebook);
            $facebookProvider.setPermissions('id,name,email,user_likes,bio');
        })
        .run(function () {
            var LangVar     = navigator.language || navigator.userLanguage;
            var userLangVar = LangVar.substring(0, 2) + '_' + LangVar.substring(3, 5).toUpperCase();
            // If we've already installed the SDK, we're done
            if (document.getElementById('facebook-jssdk')) {return;}

            // Get the first script element, which we'll use to find the parent node
            var firstScriptElement = document.getElementsByTagName('script')[0];

            // Create a new script element and set its id
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';

            // Set the new script's source to the source of the Facebook JS SDK
            facebookJS.src = 'http://connect.facebook.net/' + userLangVar + '/all.js';

            // Insert the Facebook JS SDK into the DOM
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        })
        .run(function ($window, AppConfig) {
            // Load the Parse Facebook SDK asynchronously
            //if (!($window.ionic.Platform.isIOS() || $window.ionic.Platform.isAndroid())) {
            //    $window.fbAsyncInit = function () {
            //        $window.Parse.FacebookUtils.init({
            //            appId  : AppConfig.facebook,
            //            version: 'v2.3',
            //            status : true,                                 // Check Facebook Login status
            //            xfbml  : true                                  // Look for social plugins on the page
            //        });
            //    };
            //
            //    (function (d, s, id) {
            //        var js, fjs = d.getElementsByTagName(s)[0];
            //        if (d.getElementById(id)) {
            //            return;
            //        }
            //        js              = d.createElement(s);
            //        js.id           = id;

            //        // Set the new script's source to the source of the Facebook JS SDK
            //        js.src = 'http://connect.facebook.net/' + userLangVar + '/all.js';
            //        fjs.parentNode.insertBefore(js, fjs);
            //    }(document, 'script', 'facebook-jssdk'));
            //}
        });
})();

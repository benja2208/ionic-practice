(function(){
    'use strict';
    angular
        .module('ion-analytics',['ionic'])
        .factory('Analytics', function ($cordovaDevice, $analytics, $cordovaGoogleAnalytics) {


            function init() {
                if (typeof analytics !== 'undefined') {
                    //$cordovaGoogleAnalytics.debugMode ();
                    $cordovaGoogleAnalytics.startTrackerWithId(GOOGLE_ANALYTICS_CODE);
                    $cordovaGoogleAnalytics.trackView('APP first screen');
                    $cordovaGoogleAnalytics.setUserId($cordovaDevice.getUUID());
                } else {
                    setTimeout(function () {
                        init();
                    }, 250);
                }
            };

            function view(title) {
                $analytics.pageTrack('/' + title);

                if (typeof analytics !== 'undefined') {
                    $cordovaGoogleAnalytics.trackView(title);
                } else {
                    console.log("Google Analytics plugin could not be loaded.", title);
                }
            }

            function event(category, action, label, value) {
                if (typeof analytics !== 'undefined') {
                    $cordovaGoogleAnalytics.trackEvent(category, action, label, value);
                } else {
                    console.log("Google Analytics plugin could not be loaded.", category, action, label, value);
                }
            }

            return {
                init : init,
                view : view,
                event: event
            };
        });
})();
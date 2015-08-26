(function(){
    /*
     *
     https://github.com/avivais/phonegap-parse-plugin

     Phonegap Parse.com Plugin
     Phonegap 3.0.0 plugin for Parse.com push service

     Using Parse.com's REST API for push requires the installation id, which isn't available in JS

     This plugin exposes the four native Android API push services to JS:

     getInstallationId
     getSubscriptions
     subscribe
     unsubscribe

     * */

    'use strict';
    angular
        .module('module.core')
        .factory('ParseService', function ($http, $q, Parse, ParseConfig) {

            function init() {
                var defer = $q.defer();
                Parse.initialize(ParseConfig.applicationId, ParseConfig.javascriptKey, function () {
                    defer.resolve(true);
                }, function (e) {
                    alert('error');
                    defer.reject(e);
                });
                return defer.promise;
            }

            function start() {
                var defer = $q.defer();

                init()
                    .then(function () {
                        getInstall()
                            .then(function (id) {
                                defer.resolve(id);
                            })
                            .catch(function (err) {
                                defer.reject(err);
                            });
                    })
                    .catch(function (err) {
                        defer.reject(err);
                    });

                return defer.promise;
            }

            function getInstall() {
                var defer = $q.defer();
                Parse.getInstallationId(function (id) {
                    defer.resolve(id);
                }, function (e) {
                    alert('error');
                    defer.reject(e);
                });
                return defer.promise;
            }

            function getSubscriptions() {
                var defer = $q.defer();
                Parse.getSubscriptions(function (subscriptions) {
                    alert(subscriptions);
                    defer.resolve(subscriptions);
                }, function (e) {
                    alert('error');
                    defer.reject(e);
                });
                return defer.promise;
            }

            function postSubscribe(chanel) {
                var defer = $q.defer();
                Parse.subscribe(chanel, function () {
                    alert('OK');
                    defer.resolve(true);
                }, function (e) {
                    alert('error');
                    defer.reject(e);
                });
                return defer.promise;
            }

            function postUnSubscribe(channel) {
                var defer = $q.defer();
                Parse.unsubscribe(channel, function (msg) {
                    defer.resolve(msg);
                }, function (e) {
                    alert('error');
                    defer.reject(e);
                });
                return defer.promise;
            }

            return {
                start        : start,
                getInstall   : getInstall,
                getSubscribe : getSubscriptions,
                postSubscribe: postSubscribe,
                unSubscribe  : postUnSubscribe
            };

        }
    );
})();
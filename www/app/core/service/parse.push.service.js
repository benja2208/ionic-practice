(function (window, angular, device, ParsePushPlugin, undefined) {
  'use strict';
  /*
   *
   https://github.com/avivais/phonegap-parse-plugin

   https://github.com/taivo/parse-push-plugin

   Phonegap Parse.com Plugin
   Phonegap 3.0.0 plugin for Parse.com push service

   Using Parse.com's REST API for push requires the installation id, which isn't available in JS

   This plugin exposes the four native Android API push services to JS:

   getInstallationId
   getSubscriptions
   subscribe
   unsubscribe

   * */
  angular
    .module('module.core')
    .factory('ParsePush', function ($http, $q, AppConfig) {

      function init() {
        var defer = $q.defer();
        ParsePushPlugin
          .initialize(AppConfig.parse.applicationId, AppConfig.parse.clientKey, function () {
            defer.resolve(true);
          }, function (e) {
            alert('error');
            defer.reject(e);
          });
        return defer.promise;
      }

      function on() {
        ParsePushPlugin.on('receivePN', function (pn) {
          console.log('yo i got this push notification:' + JSON.stringify(pn));
        });

        //customEvt can be any string of your choosing, i.e., chat, system, upvote, etc.
        ParsePushPlugin.on('receivePN:chat', function (pn) {
          console.log('yo i can also use custom event to keep things like chat modularized');
        });

        ParsePushPlugin.on('openPN', function (pn) {
          //you can do things like navigating to a different view here
          console.log('Yo, I get this when the user clicks open a notification from the tray');
        });
      }


      function start(channel) {

        console.log(device, channel);
        if (device) {
          console.log('Push Start', ParsePushPlugin);
          init()
            .then(function () {
              console.log('Plugin Load');
              ParsePushPlugin
                .subscribe(channel, function () {
                  console.log('Enter Chanel', chanel);
                  ParsePushPlugin
                    .getInstallationId(function (id) {

                      console.log('Success Push', id);
                      /**
                                             * Now you can construct an object and save it to your own services, or Parse, and corrilate users to parse installations
                                             *
                                             var install_data = {
                                          installation_id: id,
                                          channels: ['SampleChannel']
                                       }
                                             *
                                             */

                    }, function (e) {
                      alert('error');
                    });

                }, function (e) {
                  alert('error');
                });

            }, function (e) {
              alert('error');
            });
        }
      }

      function getInstall() {
        var defer = $q.defer();
        ParsePushPlugin.getInstallationId(function (id) {
          defer.resolve(id);
        }, function (e) {
          alert('error');
          defer.reject(e);
        });
        return defer.promise;
      }

      function getSubscriptions() {
        var defer = $q.defer();
        ParsePushPlugin.getSubscriptions(function (subscriptions) {
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
        ParsePushPlugin.subscribe(chanel, function () {
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
        ParsePushPlugin.unsubscribe(channel, function (msg) {
          defer.resolve(msg);
        }, function (e) {
          alert('error');
          defer.reject(e);
        });
        return defer.promise;
      }

      return {
        start: start,
        getInstall: getInstall,
        getSubscribe: getSubscriptions,
        postSubscribe: postSubscribe,
        unSubscribe: postUnSubscribe
      };

    });
})
(window, window.angular, window.cordova, window.ParsePushPlugin);

(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .controller('GalleryNotifyCtrl', function ($scope, $rootScope, $ionicPlatform, $cordovaLocalNotification) {

      $ionicPlatform.ready(function () {

        // ========== Scheduling

        $scope.scheduleSingleNotification = function () {
          console.log('scheduleSingleNotification');
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Title here',
            text: 'Text here',
            data: {
              customProperty: 'custom value'
            }
          }).then(function (result) {
            // ...
            console.log(result);
          });
        };

        $scope.scheduleMultipleNotifications = function () {
          $cordovaLocalNotification.schedule([{
            id: 1,
            title: 'Title 1 here',
            text: 'Text 1 here',
            data: {
              customProperty: 'custom 1 value'
            }
          }, {
            id: 2,
            title: 'Title 2 here',
            text: 'Text 2 here',
            data: {
              customProperty: 'custom 2 value'
            }
          }, {
            id: 3,
            title: 'Title 3 here',
            text: 'Text 3 here',
            data: {
              customProperty: 'custom 3 value'
            }
          }]).then(function (result) {
            // ...
            console.log(result);
          });
        };

        $scope.scheduleDelayedNotification = function () {
          var now = new Date().getTime();
          var _10SecondsFromNow = new Date(now + 10 * 1000);

          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Title here',
            text: 'Text here',
            at: _10SecondsFromNow
          }).then(function (result) {
            // ...
            console.log(result);
          });
        };

        $scope.scheduleEveryMinuteNotification = function () {
          $cordovaLocalNotification.schedule({
            id: 1,
            title: 'Title here',
            text: 'Text here',
            every: 'minute'
          }).then(function (result) {
            // ...
            console.log(result);
          });
        };

        // =========/ Scheduling

        // ========== Update

        $scope.updateSingleNotification = function () {
          $cordovaLocalNotification.update({
            id: 1,
            title: 'Title - UPDATED',
            text: 'Text - UPDATED'
          }).then(function (result) {
            // ...
            console.log(result);
          });
        };

        $scope.updateMultipleNotifications = function () {
          $cordovaLocalNotification
            .update([{
              id: 1,
              title: 'Title 1 - UPDATED',
              text: 'Text 1 - UPDATED'
            }, {
              id: 2,
              title: 'Title 2 - UPDATED',
              text: 'Text 2 - UPDATED'
            }, {
              id: 3,
              title: 'Title 3 - UPDATED',
              text: 'Text 3 - UPDATED'
            }]).then(function (result) {
              // ...
              console.log(result);
            });
        };

        // =========/ Update

        // ========== Cancelation

        $scope.cancelSingleNotification = function () {
          $cordovaLocalNotification
            .cancel(1)
            .then(function (result) {
              // ...
              console.log(result);
            });
        };

        $scope.cancelMultipleNotifications = function () {
          $cordovaLocalNotification.cancel([
            1,
            2
          ]).then(function (result) {
            // ...
            console.log(result);
          });
        };

        $scope.cancelAllNotifications = function () {
          $cordovaLocalNotification.cancelAll().then(function (result) {
            // ...
            console.log(result);
          });
        };

        // =========/ Cancelation

        // ========== Events

        $rootScope.$on('$cordovaLocalNotification:schedule',
          function (event, notification, state) {
            // ...
          });

        $rootScope.$on('$cordovaLocalNotification:trigger',
          function (event, notification, state) {
            // ...
          });

        $rootScope.$on('$cordovaLocalNotification:update',
          function (event, notification, state) {
            // ...
          });

        $rootScope.$on('$cordovaLocalNotification:clear',
          function (event, notification, state) {
            // ...
          });

        $rootScope.$on('$cordovaLocalNotification:clearall',
          function (event, state) {
            // ...
          });

        $rootScope.$on('$cordovaLocalNotification:cancel',
          function (event, notification, state) {
            // ...
          });

        $rootScope.$on('$cordovaLocalNotification:cancelall',
          function (event, state) {
            // ...
          });

        $rootScope.$on('$cordovaLocalNotification:click',
          function (event, notification, state) {
            // ...
          });

        // =========/ Events

      });

    });
})(window, window.angular);

(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.user')
    .config(function ($stateProvider, $urlRouterProvider, AppConfig) {
      $stateProvider

        .state('router', {
        url: '/',
        templateUrl: 'app/core/view/loading.html',
        controller: function ($rootScope, $state) {
          var user = $rootScope.user;
          console.log('User', user);
          if (user) {
            console.log(user);
            if (user.name) {
              $state.go(AppConfig.routes.home, {
                clear: true
              });
            } else {
              $state.go('useravatar', {
                clear: true
              });
            }
          } else {
            $state.go('intro', {
              clear: true
            });
          }
        }
      })


      .state('intro', {
        url: '/intro',
        templateUrl: 'app/user/view/user.intro.html',
        controller: 'IntroCtrl as Intro'
      })

      .state('user', {
        url: '/user',
        abstract: true,
        templateUrl: 'app/user/view/user.tabs.html'
      })

      .state('user.signin', {
        url: '/signin',
        views: {
          tabLogin: {
            controller: 'UserSigninCtrl as UserSignin',
            templateUrl: 'app/user/view/user.signin.html'
          }
        }
      })

      .state('user.signup', {
        url: '/signup',
        views: {
          tabLogin: {
            controller: 'UserSignupCtrl as UserSignup',
            templateUrl: 'app/user/view/user.signup.html'
          }
        }
      })

      .state('useravatar', {
        url: '/avatar',
        controller: 'UserAvatarCtrl as UserAvatar',
        templateUrl: 'app/user/view/user.avatar.html'
      })



      .state('usermerge', {
        url: '/merge',
        controller: 'UserMergeCtrl as UserMerge',
        templateUrl: 'app/user/view/user.merge.html'
      })

      .state('logout', {
        url: '/logout',
        template: '<ion-view view-title="Logout" cache-view="false"><ion-content></ion-content></ion-view>',
        controller: function (User, $state) {
          User.logout();
        }
      });

      $urlRouterProvider.otherwise('/');

    });
})(window, window.angular);

(function (window, angular, ionic, undefined) {
  'use strict';
  angular
    .module('module.user')
    .controller('IntroCtrl', function (User, Notify, Loading, $state, AppConfig, gettextCatalog) {
      var vm = this;

      var currentPlatform = ionic.Platform.platform();

      if (currentPlatform) {
        vm.device = (currentPlatform == 'android') ? 'android' : 'iphone';
      } else {
        vm.device = 'android';
      }

      vm.slides = [{
          top: gettextCatalog.getString('Share your most amazing moments'),
          img: 'img/intro1.jpg'
        }, {
          top: gettextCatalog.getString('Follow your friends and relive their moments'),
          img: 'img/intro2.jpg'
        }, {
          top: gettextCatalog.getString('Find people around you and enjoy your photos'),
          img: 'img/intro3.jpg'
        }, {
          top: gettextCatalog.getString('Enjoy the most amazing photos'),
          img: 'img/intro4.jpg'
        }, {
          top: gettextCatalog.getString('Create your Social Photo Share with Ionic Framework!'),
          img: 'img/intro5.jpg'
        }

      ];

      vm.slideIndex = 0;

      // Called each time the slide changes
      vm.slideChanged = function (index) {
        vm.slideIndex = index;
      };

      vm.facebook = function () {
        Loading.start();
        User
          .facebookLogin()
          .then(function (resp) {
            console.log(resp);

            Loading.end();
            switch (resp.status) {
            case 0:
              // logado
              $state.go(AppConfig.routes.home, {
                clear: true
              });
              break;
            case 1:
              // novo user
              $state.go('useravatar', {
                clear: true
              });
              break;
            case 2:
              // merge
              $state.go('usermerge', {
                clear: true
              })
              break;
            }
          })
          .catch(function (resp) {
            Loading.end();
            Notify.alert({
              title: 'Ops',
              text: gettextCatalog.getString('Facebook error') + ' ' + resp
            });
          });
      }

    });
})(window, window.angular, window.ionic);

(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.user')
    .directive('recoveryPass', function (User, $ionicPopup, gettextCatalog, Loading, Notify) {
      return {
        restrict: 'A',
        scope: {
          login: '@',
          register: '@',
        },
        link: function ($scope, elem, attr) {

          elem.bind('click', function () {

            $scope.form = {
              recovery: ''
            };

            $scope.erro = '';

            $scope.text = {
              button: gettextCatalog.getString(''),
              input: gettextCatalog.getString('Email')
            };

            $ionicPopup
              .show({
                scope: $scope,
                template: '<div class="popup-recovery"><form name="form.recovery" form-manager><label class="item item-input"><i class="icon ion-email placeholder-icon"></i><input type="email" ng-model="email" id="email" name="email" placeholder="{{ text.input }}" required ng-maxlength="80"></label><span class="error-msg">{{erro}}</span></form></div>',
                title: gettextCatalog.getString('A new password will be sent to your e-mail address'),
                buttons: [{
                  text: gettextCatalog.getString('Cancel'),
                  type: 'button-calm'
                }, {
                  text: gettextCatalog.getString('Send'),
                  type: 'button-positive',
                  onTap: function (e) {
                    if ($scope.form.recovery.$valid) {
                      return $scope.form.recovery.email.$viewValue;
                    } else {
                      //não permite o usuário fechar até ele digitar o email
                      e.preventDefault();
                      $scope.erro = gettextCatalog.getString('Invalid Email');
                    }
                  }
                }]
              })
              .then(function (res) {
                if (!angular.isUndefined(res)) {
                  var email = res;

                  console.log(res);

                  Loading.start();

                  User
                    .forgot(email)
                    .then(function (resp) {
                      console.log(resp);
                      Notify.alert({
                        login: gettextCatalog.getString('Forgot your password'),
                        text: gettextCatalog.getString('Access your accout mail')
                      });
                      Loading.end();
                    })
                    .catch(function (resp) {
                      Notify.alert({
                        login: 'Ops',
                        text: resp
                      });
                      Loading.end();
                    });
                }
              });

          });
        }
      }
    });
})(window, window.angular);

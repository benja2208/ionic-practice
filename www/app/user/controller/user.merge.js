(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.user')
    .controller('UserMergeCtrl', function (User, $rootScope, AppConfig, $state, gettextCatalog, Notify, UserForm) {
      var vm = this;

      function init() {
        vm.form = $rootScope.tempUser;
        vm.form.password = '';
      }

      init();

      vm.submitMerge = function () {

        if (vm.form.password != '') {
          var dataForm = angular.copy(vm.form);
          var form = {
            email: dataForm.email,
            password: dataForm.password
          };

          console.log(form);

          User
            .login(form)
            .then(function (user) {
              console.log(user);
              User
                .facebookLink(user)
                .then(function (resp) {
                  console.log(resp);
                  $state.go(AppConfig.routes.home, {
                    clear: true
                  })
                })
            })
            .catch(function (resp) {
              Notify.alert({
                title: 'Ops',
                text: resp.message
              });
            });
        } else {
          Notify.alert({
            title: gettextCatalog.getString('Invalid form'),
            text: gettextCatalog.getString('Please enter your email')
          });
        }

      };

    });
})(window, window.angular);

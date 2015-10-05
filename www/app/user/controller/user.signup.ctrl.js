(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.user')
    .controller('UserSignupCtrl', function ($state, UserForm, $filter, Notify, Loading, Gallery, User) {
      var vm = this;

      function init() {
        vm.form = {
          email: '',
          password: ''
        };
      }

      init();

      vm.formFields = UserForm.register;

      vm.submitRegister = function (rForm, data) {

        if (rForm.$valid) {
          Loading.start();
          var form = angular.copy(data);
          User
            .register(form)
            .then(function (resp) {
              console.log(resp);
              // Add Actvity History
              Gallery
                .addActivity({
                  action: 'registered'
                });

              // After register, login
              User
                .login({
                  email: form.email,
                  password: form.password
                })
                .then(function (data) {
                  console.log(data);
                  User.init();
                  Loading.end();
                  $state.go('useravatar', {
                    clear: true
                  });
                })
                .catch(function (resp) {
                  console.log(resp);
                  Loading.end();
                  Notify.alert({
                    title: 'Ops',
                    text: resp.message
                  });
                });
            })
            .catch(function (resp) {
              console.log(resp);
              Loading.end();
              Notify.alert({
                title: 'Ops',
                text: resp.message
              });
            });
        }
      };
    });
})(window, window.angular);

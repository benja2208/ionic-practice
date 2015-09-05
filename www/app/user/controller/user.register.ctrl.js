(function () {
    'use strict';
    angular
        .module('module.user')
        .controller('RegisterCtrl', function ($state, UserForm, $filter, Notify, Gallery, User) {
            var vm = this;

            function init() {
                vm.form = {
                    email   : '',
                    password: ''
                };
            }

            init();

            vm.formFields = UserForm.register;

            vm.submitRegister = function (rForm, data) {

                if (rForm.$valid) {
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
                                    email   : form.email,
                                    password: form.password
                                })
                                .then(function (data) {
                                    console.log(data);
                                    User.init();
                                    $state.go('useravatar', {clear: true});
                                })
                                .catch(function (resp) {
                                    Notify.alert({
                                        title: 'Ops',
                                        text : resp
                                    });
                                });
                        })
                        .catch(function (resp) {
                            console.log(resp);
                            Notify.alert({
                                title: 'Ops',
                                text : resp
                            });
                        });
                }
            };
        });
})();

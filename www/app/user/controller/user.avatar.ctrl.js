(function () {
    'use strict';
    angular
        .module('module.user')
        .controller('UserAvatarCtrl', function (User, AppConfig, $state, gettextCatalog, Notify, UserForm) {
            var vm = this;

            function init() {
                vm.form       = User.currentUser();
                vm.formFields = UserForm.profile;
            }

            init();

            vm.submitAvatar = function () {
                console.log(vm.rForm);

                if (vm.rForm.$valid) {
                    var dataForm = angular.copy(vm.form);
                    User
                        .update(dataForm)
                        .then(function (resp) {
                            console.log(resp);
                            User.init();
                            $state.go(AppConfig.routes.home, {clear: true})
                        });
                } else {
                    Notify.alert({
                        title: gettextCatalog.getString('Invalid form'),
                        text : gettextCatalog.getString('Fill out the fields in red')
                    });
                }

            };

        });
})();
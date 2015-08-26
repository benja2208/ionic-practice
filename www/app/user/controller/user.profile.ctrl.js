'use strict';
angular
    .module('module.user')
    .controller('UserProfileCtrl', function ($rootScope, User, UserForm) {
        var vm = this;

        vm.form       = $rootScope.user;
        vm.formFields = UserForm.profile;

        // Set Motion
        vm.submitProfile = function (rForm, form) {
            if (rForm.$valid) {
                var formData = angular.copy(form);
                User
                    .update(formData)
                    .then(function (resp) {
                        console.log(resp);
                    });
            }
        };

    });
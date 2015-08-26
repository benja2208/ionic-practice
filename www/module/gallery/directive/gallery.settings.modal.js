(function(){
    'use strict';
    angular
        .module('module.gallery')
        .directive('gallerySettings', function ($ionicModal, $rootScope, $cordovaSocialSharing, gettextCatalog, User, UserForm, $state) {
            return {
                restrict: 'A',
                scope   : {
                    gallery: '@'
                },
                template: '',
                link    : function (scope, elem, attr) {

                    function init() {
                        scope.form       = User.currentUser();
                        scope.formFields = UserForm.profile;
                        scope.languages  = $rootScope.langs;
                        scope.language   = $rootScope.lang;
                    }

                    elem.bind('click', function () {

                        init();
                        $ionicModal.fromTemplateUrl('module/gallery/view/gallery.settings.modal.html', {
                            scope: scope
                        }).then(function (modal) {
                            scope.modal = modal;
                            scope.modal.show();
                        });
                    });

                    scope.link = function (sref) {
                        $state.go(sref)
                        scope.closeModal();
                    };

                    scope.changeLanguage = function (language) {
                        scope.form.language = language;
                        submitUpdateProfile(scope.form);
                        $rootScope.setLanguage(language);
                    };


                    function submitUpdateProfile(form) {
                        var dataForm = angular.copy(form);
                        User
                            .update(dataForm)
                            .then(function (resp) {
                                console.log(resp);
                                init();
                                scope.closeModal();
                            })
                    };

                    scope.closeModal = function () {
                        scope.modal.hide();
                        scope.modal.remove();
                    };


                    var message = {
                        title  : 'Conheça o STube, o app para vídeos adultos',
                        image  : 'http://stube.com.br/images/screen1.jpg',
                        link   : 'http://stube.com.br',
                        subject: 'Um amigo indicou um app para você'
                    };


                    // Share
                    scope.shareViaTwitter = function () {
                        $cordovaSocialSharing
                            .shareViaTwitter(message.text, message.image, message.link)
                            .then(function (result) {
                                // Success!
                            }, function (err) {
                                // An error occurred. Show a message to the user
                            });

                    };

                    scope.shareViaFacebook = function () {


                        $cordovaSocialSharing
                            .shareViaFacebook(message.text, message.image, message.link)
                            .then(function (result) {
                                // Success!
                            }, function (err) {
                                // An error occurred. Show a message to the user
                            });
                    };

                    scope.shareViaWhatsApp = function () {

                        $cordovaSocialSharing
                            .shareViaWhatsApp(message.text, message.image, message.link)
                            .then(function (result) {
                                // Success!
                            }, function (err) {
                                // An error occurred. Show a message to the user
                            });
                    };

                    scope.shareViaSMS = function () {
                        $cordovaSocialSharing
                            .shareViaSMS(message.title, null)
                            .then(function (result) {
                                // Success!
                            }, function (err) {
                                // An error occurred. Show a message to the user
                            });
                    };

                    scope.shareViaEmail = function () {
                        $cordovaSocialSharing
                            .shareViaEmail(message.title, message.subject)
                            .then(function (result) {
                                // Success!
                            }, function (err) {
                                // An error occurred. Show a message to the user
                            });
                    };
                }
            }
        });
})();
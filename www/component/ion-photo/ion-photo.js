(function () {
    'use strict';
    angular
        .module('ion-photo', ['ionic'])
        .factory('PhotoService', function ($ionicActionSheet, $window, $ionicPopup, $cordovaCamera, $cordovaImagePicker, gettextCatalog, $q, Notify) {

            function capture(type, setting) {
                var defer = $q.defer();

                console.log(setting);
                if (setting === undefined) {
                    setting = {
                        quality           : 80,
                        allowEdit         : true,
                        correctOrientation: true,
                        targetWidth       : 640,
                        targetHeight      : 640,
                        saveToPhotoAlbum  : false,
                    }
                }

                var options = {
                    quality           : setting.quality,
                    allowEdit         : setting.allowEdit,
                    correctOrientation: setting.correctOrientation,
                    targetWidth       : setting.targetWidth,
                    targetHeight      : setting.targetHeight,
                    saveToPhotoAlbum  : setting.saveToPhotoAlbum,
                    destinationType   : Camera.DestinationType.DATA_URL,
                    encodingType      : Camera.EncodingType.JPEG,
                    popoverOptions    : CameraPopoverOptions,
                };


                // CAMERA
                if (type === 0) {
                    options.sourceType = Camera.PictureSourceType.CAMERA;
                }

                // GALLERY
                if (type === 1) {
                    options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                }

                console.log(options);

                $cordovaCamera
                    .getPicture(options)
                    .then(function (imageData) {
                        defer.resolve(imageData);
                    }, function (err) {
                        defer.reject('Error When taking Photo:' + err)
                    });
                return defer.promise;
            }


            function open(setting) {
                var defer       = $q.defer();
                var actionSheet = $ionicActionSheet.show({
                    buttons      : [
                        {
                            text: '<i class="icon ion-ios-camera"></i>' + gettextCatalog.getString('Camera')
                        },
                        {
                            text: '<i class="icon ion-images"></i>' + gettextCatalog.getString('Gallery')
                        }
                    ],
                    titleText    : gettextCatalog.getString('Send Photo'),
                    cancelText   : gettextCatalog.getString('Cancel'),
                    cancel       : function () {
                        defer.reject('Cancel');
                    },
                    buttonClicked: function (index) {
                        console.log(index);

                        if ($window.cordova) {
                            capture(index, setting)
                                .then(function (resp) {
                                    actionSheet();
                                    defer.resolve(resp);
                                })
                                .catch(function (resp) {
                                    actionSheet();
                                    defer.reject(resp);
                                });
                        } else {
                            Notify.alert({
                                title: gettextCatalog.getString('Error'),
                                text : gettextCatalog.getString('Enabled your camera')
                            });
                            actionSheet();
                            defer.reject('Camera not disponible');
                        }


                    }
                });
                return defer.promise;
            }

            return {
                open: open
            };

        });
})();
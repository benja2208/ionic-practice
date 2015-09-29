'use strict';
angular
    .module ('ion-crop')
    .directive ('ionCrop', function ($ionicModal, $jrCrop, $rootScope, $q, $timeout, $http, $ionicActionSheet, ENV, Container, FileUploader, fileReader, gettextCatalog) {

    function base64ToBlob (base64Data, contentType) {
        contentType        = contentType || '';
        var sliceSize      = 1024;
        var byteCharacters = atob (base64Data);
        var bytesLength    = byteCharacters.length;
        var slicesCount    = Math.ceil (bytesLength / sliceSize);
        var byteArrays     = new Array (slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end   = Math.min (begin + sliceSize, bytesLength);

            var bytes = new Array (end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt (0);
            }
            byteArrays[sliceIndex] = new Uint8Array (bytes);
        }
        return new Blob (byteArrays, {
            type: contentType
        });
    }

    return {
        restrict: 'A',
        scope   : {
            cropImage  : '=',
            cropOptions: '=',
            cropSave   : '&'
        },
        template: '<div><input type="file" id="browseBtn" image="image" accept="image/*" style="display: none"/></div>',
        link    : function ($scope, element) {
            /*
             * 1) Action Sheet (Tirar foto, Galeria)
             * 2) Galeria
             * 3) Cortar Imagem : Crop
             * 4) Fazer Upload
             * 5) Retornar endereço do arquivo
             * 6) Atualizar Model
             * */

            // Triggered on a button click, or some other target
            $scope.action = function () {

                // Show the action sheet
                var hideSheet = $ionicActionSheet.show ({
                    buttons      : [
                        {
                            text: '<i class="icon ion-camera"></i>' + gettextCatalog.getString ('Photo Camera')
                        },
                        {
                            text: '<i class="icon ion-images"></i> ' + gettextCatalog.getString ('Photo Album')
                        }
                    ],
                    //destructiveText: gettextCatalog.getString ('Delete'),
                    titleText    : gettextCatalog.getString ('Change Image'),
                    cancelText   : gettextCatalog.getString ('Cancel'),
                    cancel       : function () {
                        // add cancel code..
                    },
                    buttonClicked: function (index) {

                        if (index === 0) {
                            console.log ('Photo Camera');
                        }
                        // Photo Album
                        if (index === 1) {
                            document.getElementById ('browseBtn').click ();
                        }
                        return true;
                    }
                });

            };

            element.bind ('click', function () {
                document.getElementById ('browseBtn').click ();
            });

            // 2) File Input
            angular.element (document.getElementById ('browseBtn')).on ('change', function (e) {

                var file   = e.target.files[0];
                var reader = new FileReader ();
                reader.readAsDataURL (file);

                reader.onload = function (event) {
                    var image = event.target.result;
                    $scope.crop (image);
                };

                // Clear input file
                angular.element (document.getElementById ('browseBtn')).val ('');

            });

            // 3) Cortar Imagem
            $scope.crop = function (image) {

                $jrCrop
                    .crop ({
                    url       : image,
                    width     : $scope.cropOptions.width || 200,
                    height    : $scope.cropOptions.height || 200,
                    cancelText: gettextCatalog.getString ('Cancel'),
                    chooseText: gettextCatalog.getString ('Save')
                })
                    .then (function (canvas) {
                    var image    = canvas.toDataURL ();
                    var name     = $scope.cropOptions.name || 'thumb';
                    var filename = User.id + '_' + name + Number (new Date ()) + '.jpg';

                    var file  = base64ToBlob (image.replace ('data:image/png;base64,', ''), 'image/jpeg');
                    file.name = filename;

                    upload (file);


                });

            };


            /////////////
            function upload (filer) {

                var uploader = new FileUploader ({
                    // scope: $scope, // to automatically update the html. Default: $rootScope
                    url       : ENV.apiUrl + '/containers/files/upload',
                    autoUpload: true
                });

                uploader.addToQueue (filer);

                uploader.onProgressItem = function () {
                    $rootScope.$broadcast ('loading:show');
                };

                uploader.onCompleteItem = function (fileItem, response, status, headers) {

                    $rootScope.$broadcast ('loading:hide');

                    console.info ('onCompleteItem', fileItem, response, status, headers);
                    //  Delete File
                    $http.delete ($scope.cropImage.replace ('download', 'files'))
                        .success (function (data, status, headers) {
                        //

                    });
                    //  Retorno o novo valor
                    $scope.cropImage = ENV.apiUrl + '/containers/files/download/' + response.result.files.file[0].name;
                    //  Executo o callback
                    $timeout (function () {
                        $scope.cropSave ();
                    }, 100);
                };


            }

        }
    };
});
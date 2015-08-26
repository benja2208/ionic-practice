(function(){
    'use strict';
    angular
        .module('module.gallery')
        .factory('ParseImageService', function ($window) {

            var _all    = function () {
                var query = new Parse.Query('ImageInfo');
                query.descending('createdAt');
                return query.find();
            };
            var _delete = function (_objectId) {
                var query = new Parse.Query('ImageInfo');
                return query.get(_objectId).then(function (_data) {
                    return _data.destroy();
                });
            };
            var _get    = function (_objectId) {
                var query = new Parse.Query('ImageInfo');
                //query.descending('gpa');
                return query.get(_objectId);
            };
            /**
             *
             * @param _params
             * @private
             */
            var _save   = function (_params) {
                var ImageObject = Parse.Object.extend('Gallery');


                if (_params.photo !== '') {

                    console.log('_params.photo ' + _params.photo);

                    // create the parse file
                    var imageFile = new Parse.File('mypic.jpg', {base64: _params.photo});
                    //       var imageFile = new Parse.File('mypic.jpg', _params.photo);


                    // save the parse file
                    return imageFile.save().then(function () {

                        _params.photo = null;

                        // create object to hold caption and file reference
                        var imageObject = new ImageObject();

                        // set object properties
                        imageObject.set('title', _params.title);
                        imageObject.set('img', imageFile);
                        imageObject.set('user', Parse.User.current());
                        imageObject.set('thumbBase64', _params.thumbBase64);
                        imageObject.set('location', new Parse.GeoPoint(_params.coords.latitude, _params.coords.longitude));

                        // save object to parse backend
                        return imageObject.save();


                    }, function (error) {
                        console.log('Error');
                        console.log(error);
                    });

                } else {
                    // create object to hold caption and file reference
                    var imageObject = new ImageObject();

                    // set object properties
                    imageObject.set('caption', _params.caption);

                    // save object to parse backend
                    return imageObject.save();

                }
            };
            return {
                all              : _all,
                save             : _save,
                get              : _get,
                delete           : _delete,
                /**
                 * get settings from local storage
                 * @returns {*}
                 */
                imageSettings    : function () {
                    var savedData = $window.localStorage.getItem('application.image.props') || null;
                    return (savedData !== null ? JSON.parse(savedData) :
                    {
                        quality    : 50,
                        dimensions : 250,
                        saveToAlbum: false
                    });
                },
                /**
                 * save settings to local storage
                 * @param _settings
                 */
                saveImageSettings: function (_settings) {
                    $window.localStorage.setItem('application.image.props', JSON.stringify(_settings));
                }
            }
        });
})();
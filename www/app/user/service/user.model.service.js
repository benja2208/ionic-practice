(function () {
    'use strict';
    angular
        .module('module.user')
        .factory('User', function ($q, AppConfig, $rootScope, $timeout, $location, Parse, $cordovaDevice, $window, $facebook, $cordovaFacebook, Loading, $state, Notify) {

            var device   = $window.cordova ? true : false;
            var facebook = device ? $cordovaFacebook : $facebook;
            var data     = {
                user    : {},
                facebook: {}
            };

            function init() {
                // Parse Start
                Parse.initialize(AppConfig.parse.applicationId, AppConfig.parse.javascriptKey);
                var user = Parse.User.current();

                if (user) {
                    console.log('Logged user');
                    return loadProfile(user);
                } else {
                    console.log('Not logged user, go intro');
                    $state.go(AppConfig.routes.login, {clear: true});
                }
            }

            function currentUser() {
                return $rootScope.user;
            }


            function loadProfile(response) {
                if (response) {
                    var user        = response.attributes;
                    user.id         = user.id;
                    user            = processImg(user);
                    delete $rootScope.user;
                    $rootScope.user = user;
                    console.log('load profile', response, user);
                    return user;
                } else {
                    logout();
                    return false;
                }
            }

            function processImg(obj) {
                console.log('process image', obj);
                if (obj.facebook) {
                    obj.src = (obj.facebookimg) ? obj.facebookimg : 'img/user.png';
                } else {
                    obj.src = (obj.img) ? obj.img.url() : 'img/user.png';
                }
                return obj;
            }

            function login(form) {
                var defer = $q.defer();
                Loading.start();
                Parse
                    .User
                    .logIn(form.email, form.password, {
                        success: function (resp) {
                            console.log(resp);
                            Loading.end();
                            var user = loadProfile(resp);
                            defer.resolve(user);
                        },
                        error  : function (user, err) {
                            console.error(user, err);
                            Loading.end();
                            // The login failed. Check error to see why.
                            if (err.code === 101) {
                                defer.reject('Invalid login credentials');
                            } else {
                                defer.reject('An unexpected error has occurred, please try again.');
                            }
                        }
                    });
                return defer.promise;
            }

            function facebookLogin() {
                var defer = $q.defer();

                facebook
                    .login([
                        'public_profile',
                        'email',
                        'user_friends'
                    ]).then(function (resp) {
                        defer.resolve(resp);
                    }, function (resp) {
                        defer.reject(resp);
                    });

                return defer.promise;
            }


            function facebookProfile() {
                var defer = $q.defer();
                facebookLogin()
                    .then(function (resp) {

                        facebook
                            .api('me', '')
                            .then(function (response) {
                                defer.resolve([
                                    resp,
                                    response
                                ]);
                            }, function (error) {
                                console.log(error);
                                defer.reject(error);
                            });
                    });
                return defer.promise;
            }


            function register(form) {
                var defer = $q.defer();

                var formData      = form;
                formData.username = form.email;
                Loading.start();

                console.log(formData);
                new Parse
                    .User(formData)
                    .signUp(null, {
                        success: function (resp) {
                            var user = loadProfile(resp.attributes);
                            Loading.end();
                            defer.resolve(user);
                        },
                        error  : function (user, resp) {
                            Loading.end();
                            console.log(resp);
                            if (resp.code === 125) {
                                defer.reject('Please specify a valid email address');
                            } else if (resp.code === 202) {
                                defer.reject('The email address is already registered');
                            } else {
                                defer.reject(resp);
                            }
                        }
                    });
                return defer.promise;
            }

            function forgot(form) {
                var defer = $q.defer();
                new Parse
                    .User
                    .requestPasswordReset(form.email, {
                        success: function (resp) {
                            defer.resolve(resp);
                        },
                        error  : function (err) {
                            if (err.code === 125) {
                                defer.reject('Email address does not exist');
                            } else {
                                defer.reject('An unknown error has occurred, please try again');
                            }
                        }
                    });
                return defer.promise;
            }

            function logout() {
                new Parse.User.logOut();
                delete $rootScope.user;
                //$window.location = '/#/intro';
                $state.go('intro', {clear: true});
            }

            function update(form) {
                var defer       = $q.defer();
                var currentUser = Parse.User.current();
                Loading.start();
                delete form.img;
                console.info('update user', form);

                angular.forEach(form, function (value, key) {
                    currentUser.set(key, value);
                });

                if ($window.device) {

                    var cordovaDevice = {
                        device  : $cordovaDevice.getDevice(),
                        cordova : $cordovaDevice.getCordova(),
                        model   : $cordovaDevice.getModel(),
                        platform: $cordovaDevice.getPlatform(),
                        uuid    : $cordovaDevice.getUUID(),
                        version : $cordovaDevice.getVersion()
                    };

                    currentUser.set('device', cordovaDevice.device);
                    currentUser.set('deviceCordova', cordovaDevice.cordova);
                    currentUser.set('deviceModel', cordovaDevice.model);
                    currentUser.set('devicePlatform', cordovaDevice.platform);
                    currentUser.set('deviceUuiid', cordovaDevice.uuid);
                    currentUser.set('deviceVersion', cordovaDevice.version);
                }
                console.log($rootScope.lang);
                currentUser.set('language', $rootScope.lang.value);
                currentUser
                    .save()
                    .then(function (resp) {

                        var user = loadProfile(resp.attributes);
                        Loading.end();
                        defer.resolve(user);
                    });


                return defer.promise;
            }

            function updateAvatar(photo) {
                var defer = $q.defer();

                Loading.start();

                if (photo !== '') {

                    // create the parse file
                    var imageFile = new Parse.File('mypic.jpg', {base64: photo});

                    // save the parse file
                    return imageFile
                        .save()
                        .then(function () {

                            photo = null;

                            // create object to hold caption and file reference
                            var currentUser = Parse.User.current();

                            // set object properties
                            currentUser.set('img', imageFile);

                            // save object to parse backend
                            currentUser
                                .save()
                                .then(function (resp) {
                                    var user = loadProfile(resp.attributes);
                                    console.log(resp);
                                    Loading.end();
                                    defer.resolve(user);
                                });


                        }, function (error) {
                            Loading.end();
                            console.log(error);
                            defer.reject(error);
                        });
                }
                return defer.promise;
            }


            function facebookUpdateProfile(response) {
                console.log(response);
                var defer = $q.defer();
                var user  = {
                    facebook    : response.id,
                    name        : response.first_name + ' ' + response.middle_name + ' ' + response.last_name,
                    email       : response.email,
                    relationship: (response.relationship) ? response.relationship : '',
                    relation    : (response.significant_other) ? response.significant_other.id : '',
                    site        : response.link,
                    location    : (response.location) ? response.location.name : '',
                    facebookimg : 'https://graph.facebook.com/' + response.id + '/picture?width=250&height=250',
                    idFacebook  : response.id,
                    gender      : response.gender
                };

                console.log(response, user);

                update(user)
                    .then(function (resp) {
                        console.log(resp);
                        loadProfile(resp);
                        defer.resolve(resp);
                    });

                return defer.promise;
            }

            function loginParseFacebook() {
                var defer = $q.defer();

                facebookProfile()
                    .then(function (resp) {

                        var userData = resp[0];
                        var profile  = resp[1];

                        if (!userData.authResponse) {
                            console.log("Cannot find the authResponse");
                            return;
                        }
                        var expDate = new Date(
                            new Date().getTime() + userData.authResponse.expiresIn * 1000
                        ).toISOString();

                        var authData = {
                            id             : String(userData.authResponse.userID),
                            access_token   : userData.authResponse.accessToken,
                            expiration_date: expDate
                        };

                        console.log(resp);
                        console.log(userData);
                        console.log(profile);

                        data.facebook = profile;

                        fbLogged.resolve([
                            authData,
                            profile
                        ]);

                    }).catch(function (resp) {
                        console.log(resp);
                        Loading.end();
                        Notify.alert('Ops', resp);
                    });

                var fbLogged = new Parse.Promise();

                fbLogged
                    .then(function (resp) {
                        var authData = resp[0];
                        var user     = Parse.User.current();

                        console.log(authData, user);

                        if (!user) {
                            return Parse.FacebookUtils.logIn(authData);
                        } else {
                            return Parse.FacebookUtils.link(user, authData);
                        }
                    })
                    .then(function (userObject) {
                        console.info(userObject);
                        console.info(data.facebook);

                        defer.resolve(data.facebook);

                    }, function (error) {
                        Loading.end();
                        defer.reject(error);
                    });

                return defer.promise;
            }

            function loginFacebook() {
                var defer = $q.defer();
                Loading.start();

                loginParseFacebook()
                    .then(function (response) {
                        console.log(response);

                        facebookUpdateProfile(response)
                            .then(function (resp) {
                                console.log(resp);
                                Loading.end();
                                defer.resolve(resp);
                            });

                    });

                return defer.promise;
            }

            function facebookFriends() {
                var defer = $q.defer();

                facebook
                    .api('me/friends')
                    .then(function (success) {
                        defer.resolve(success);
                    }, function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            }

            function facebookAPI(api) {
                var defer = $q.defer();

                facebook
                    .api(api)
                    .then(function (success) {
                        defer.resolve(success);
                    }, function (error) {
                        defer.reject(error);
                    });

                return defer.promise;
            }

            function facebookInvite() {
                var defer = $q.defer();
                if (device) {
                    facebook
                        .showDialog({
                            method : 'apprequests',
                            message: 'Venha para o nosso clube!'
                        })
                        .then(function (resp) {
                            defer.resolve(resp);
                        });
                } else {
                    facebook
                        .ui({
                            method : 'apprequests',
                            message: 'Venha para o nosso clube!'
                        })
                        .then(function (resp) {
                            defer.resolve(resp);
                        });
                }
                return defer.promise;
            }

            function list(force) {
                var defer = $q.defer();

                new Parse
                    .Query('User')
                    .find()
                    .then(function (resp) {
                        var users = [];
                        angular.forEach(resp, function (item) {
                            var user = item.attributes;
                            user.id  = item.id;
                            user     = processImg(user);
                            if (user.id != Parse.User.current().id) {
                                users.push(user);
                            }

                        });
                        defer.resolve(users);
                    });

                return defer.promise;
            }

            function find(userId) {
                var defer = $q.defer();
                new Parse
                    .Query('User')
                    .equalTo('objectId', userId)
                    .first()
                    .then(function (resp) {
                        console.log(resp);
                        defer.resolve(resp);
                    });

                return defer.promise;
            }


            function addFollow(user) {
                var defer = $q.defer();

                find(user.id)
                    .then(function (follow) {
                        var Object = Parse.Object.extend('UserFollow');
                        var item   = new Object();

                        item.set('user', Parse.User.current());
                        item.set('follow', follow);
                        item.save()
                            .then(function (resp) {
                                defer.resolve(resp);
                            });
                    });

                return defer.promise;
            }

            function addFollows(users) {
                var promises = [];
                angular.forEach(users, function (user) {
                    promises.push(addFollow(user));
                });
                return $q.all(promises);
            }

            function getMail(email) {
                var defer = $q.defer();
                Loading.start();
                new Parse
                    .Query('User')
                    .equalTo('email', email)
                    .first()
                    .then(function (resp) {
                        Loading.end();
                        defer.resolve(resp);
                    }, function (resp) {
                        Loading.end();
                        defer.reject(resp);
                    })
                return defer.promise;
            }

            function facebookLink(response, user) {
                var defer = $q.defer();

                console.log(response);
                // Faz a Data ficar no formato perfeitoOoO
                var data = new Date(new Date().getTime() + response['authResponse']['expiresIn'] * 1000);

                Parse
                    .FacebookUtils
                    .link(user, {
                        id             : response['authResponse']['userID'] + '',
                        access_token   : response['authResponse']['accessToken'],
                        expiration_date: data
                    },
                    {
                        success: function (user) {

                            defer.resolve(user);
                        },
                        error  : function (user, error) {
                            defer.reject('Não foi possivel associar sua conta :(")');
                        }
                    });

                return defer.promise;
            }


            return {
                init              : init,
                addFollows        : addFollows,
                addFollow         : addFollow,
                currentUser       : currentUser,
                register          : register,
                login             : login,
                loginFacebook     : loginFacebook,
                logout            : logout,
                update            : update,
                updateAvatar      : updateAvatar,
                forgot            : forgot,
                list              : list,
                find              : find,
                mail              : getMail,
                loginParseFacebook: loginParseFacebook,
                facebookLink      : facebookLink,
                facebookLogin     : facebookLogin,
                facebookProfile   : facebookProfile,
                facebookFriends   : facebookFriends,
                facebookInvite    : facebookInvite,
                facebookAPI       : facebookAPI
            };
        })
    ;

})();

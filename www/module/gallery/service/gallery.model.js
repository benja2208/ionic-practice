(function () {
    'use strict';
    angular
        .module('module.gallery')
        .factory('Gallery', function ($http, $q, gettextCatalog, $translate, Parse, User, CacheFactory, Loading) {


            var form = [
                {
                    key            : 'title',
                    type           : 'input',
                    templateOptions: {
                        type           : 'text',
                        placeholder    : $translate.instant('TITLE'),
                        icon           : 'icon-envelope',
                        required       : true,
                        iconPlaceholder: true,
                        focus          : true
                    }
                },
                {
                    key            : 'geo',
                    type           : 'toggle',
                    templateOptions: {
                        label      : $translate.instant('GEOLOCATION'),
                        toggleClass: 'positive'
                    }
                }
            ];

            var formComment = [
                {
                    key            : 'text',
                    type           : 'input',
                    templateOptions: {
                        placeholder: $translate.instant('ADDCOMMENT'),
                        type       : 'text',
                        required   : true,
                        focus      : true
                        //icon           : 'icon-envelope',
                        //iconPlaceholder: true
                    }
                }
            ];

            var formShare = [
                {
                    key            : 'facebook',
                    type           : 'toggle',
                    templateOptions: {
                        label      : $translate.instant('Facebook'),
                        toggleClass: 'positive'
                    }
                },
                {
                    key            : 'twitter',
                    type           : 'toggle',
                    templateOptions: {
                        label      : $translate.instant('Twitter'),
                        toggleClass: 'positive'
                    }
                },
                {
                    key            : 'whatsapp',
                    type           : 'toggle',
                    templateOptions: {
                        label      : $translate.instant('Whatsapp'),
                        toggleClass: 'positive'
                    }
                },
                {
                    key            : 'SMS',
                    type           : 'toggle',
                    templateOptions: {
                        label      : $translate.instant('SMS'),
                        toggleClass: 'positive'
                    }
                },
                {
                    key            : 'email',
                    type           : 'toggle',
                    templateOptions: {
                        label      : $translate.instant('Email'),
                        toggleClass: 'positive'
                    }
                },
            ];

            var currentUser  = Parse.User.current();
            var limitComment = 3;

            function loadProfile(response) {

                if (response) {
                    var user      = processImg(response);

                    console.info(response, user);
                    return user;
                } else {
                    logout();
                    return false;
                }
            }


            function add(_params) {
                var defer = $q.defer();

                var ImageObject = Parse.Object.extend('Gallery');


                if (_params.photo !== '') {

                    //console.log('_params.photo ' + _params.photo);

                    // create the parse file
                    var imageFile = new Parse.File('mypic.jpg', {base64: _params.photo});

                    // save the parse file
                    return imageFile.save().then(function () {

                        _params.photo = null;

                        // create object to hold caption and file reference
                        var imageObject = new ImageObject();

                        // set object properties
                        imageObject.set('title', _params.title);
                        imageObject.set('img', imageFile);
                        imageObject.set('user', Parse.User.current());
                        if (_params.location !== undefined) {
                            imageObject.set('location', new Parse.GeoPoint(_params.location.latitude, _params.location.longitude));
                        }

                        // save object to parse backend
                        imageObject
                            .save(function (resp) {
                                defer.resolve(resp);
                            });


                    }, function (error) {
                        defer.reject(error);
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


                return defer.promise;
            }

            function allComment(galleryId) {
                var defer = $q.defer();

                var gallery = new Parse
                    .Query('Gallery')
                    .get(galleryId, function (resp) {
                        console.log(resp);
                        return resp;
                    });

                new Parse
                    .Query('GalleryComment')
                    .equalTo('galery', gallery)
                    //.include ('commentBy')
                    .descending('createdAt')
                    .find()
                    .then(function (resp) {
                        var objs = [];
                        angular.forEach(resp, function (item) {
                            var obj  = item.attributes;
                            obj.id   = item.id;
                            obj.user = item.attributes.commentBy;
                            objs.push(obj);
                        });
                        Loading.end();
                        defer.resolve(objs);
                    });
                return defer.promise;
            }

            function getComments(obj) {
                var defer = $q.defer();

                new Parse
                    .Query('Gallery')
                    .get(obj)
                    .then(function (gallery) {
                        new Parse
                            .Query('GalleryComment')
                            .equalTo('gallery', gallery)
                            .include('commentBy')
                            .ascending('createdAt')
                            .find()
                            .then(function (resp) {
                                var comments = [];
                                angular.forEach(resp, function (item) {
                                    console.warn(item);
                                    var obj  = {
                                        id     : item.id,
                                        text   : item.attributes.text,
                                        user   : item.attributes.commentBy.attributes,
                                        created: item.createdAt
                                    }
                                    obj.user = processImg(obj.user);
                                    comments.push(obj);
                                });
                                defer.resolve(comments);
                            });
                    })

                return defer.promise;
            }

            function getLikes(obj) {
                var defer = $q.defer();

                new Parse
                    .Query('Gallery')
                    .get(obj)
                    .then(function (gallery) {
                        new Parse
                            .Query('GalleryLike')
                            .equalTo('gallery', gallery)
                            .include('user')
                            .ascending('createdAt')
                            .find()
                            .then(function (resp) {
                                var objs = [];
                                angular.forEach(resp, function (item) {
                                    console.warn(item);
                                    var obj = {
                                        id     : item.id,
                                        text   : item.attributes.text,
                                        user   : item.attributes.user.attributes,
                                        created: item.createdAt
                                    }
                                    objs.push(obj);
                                });
                                console.log(objs);
                                defer.resolve(objs);
                            });
                    })

                return defer.promise;
            }


            function nearby(position) {
                var defer = $q.defer();
                var data  = [];

                var point       = new Parse.GeoPoint(position);
                var maxDistance = 1000;

                Loading.start();

                new Parse
                    .Query('Gallery')
                    //.near('location', point)
                    .withinRadians('location', point, maxDistance)
                    .limit(50)
                    .find()
                    .then(function (resp) {
                        angular.forEach(resp, function (value, key) {
                            var size     = 100;
                            var obj      = value.attributes;
                            obj.id       = value.id;
                            obj.img      = value.attributes.img.url();
                            obj.created  = value.createdAt;
                            obj.icon     = {
                                size: {
                                    width : 100,
                                    height: 100
                                },

                                scaledSize: {
                                    width : size / 2,
                                    height: size / 2
                                },
                                url       : 'img/icon.png'
                            };
                            obj.icon.url = obj.img;
                            obj.coords   = {
                                latitude : obj.location._latitude,
                                longitude: obj.location._longitude
                            };
                            data.push(obj);
                        });

                        Loading.end();
                        defer.resolve(data);
                    });

                return defer.promise;
            }

            function search() {
                var defer = $q.defer();
                var data  = [];

                new Parse
                    .Query('Gallery')
                    .limit(15)
                    .find()
                    .then(function (resp) {
                        angular.forEach(resp, function (value, key) {
                            var obj = {
                                id     : value.id,
                                item   : value.attributes,
                                src    : value.attributes.img.url(),
                                created: value.createdAt
                            };
                            data.push(obj);
                        });
                        defer.resolve(data);
                    });

                return defer.promise;
            }

            /*
             * 1) Gallery, Limit
             * 2) GalleryComment, Limi
             * 3) Like, count, liked
             * */
            function all(page) {
                var defer = $q.defer();
                var limit = 10;
                var data  = new Array();
                //Loading.start ();

                new Parse
                    .Query('Gallery')
                    .descending('createdAt')
                    .include('user')
                    .limit(limit)
                    .skip(page * limit)
                    .find()
                    .then(function (resp) {

                        var cb = _.after(resp.length, function () {
                            defer.resolve(data);
                        });

                        _.each(resp, function (item) {
                            //grab relations

                            var likes    = item.relation('likes');
                            var comments = item.relation('comments');

                            likes
                                .query()
                                .equalTo('gallery', item)
                                .equalTo('user', currentUser)
                                .count()
                                .then(function (liked) {

                                    likes
                                        .query()
                                        .count()
                                        .then(function (likes) {

                                            comments
                                                .query()
                                                .include('commentBy')
                                                .ascending('createdAt')
                                                .limit(limitComment)
                                                .find()
                                                .then(function (comments) {
                                                    console.log(comments);

                                                    var commentsData = [];

                                                    angular.forEach(comments, function (item) {
                                                        var user        = item.attributes.commentBy;
                                                        var comment     = {
                                                            id  : item.id,
                                                            text: item.attributes.text,
                                                            user: user.attributes
                                                        };
                                                        comment.user.id = user.id;
                                                        comment.user    = processImg(comment.user);
                                                        commentsData.push(comment);
                                                    });

                                                    var obj = {
                                                        id      : item.id,
                                                        item    : item.attributes,
                                                        created : item.createdAt,
                                                        likes   : likes,
                                                        liked   : liked,
                                                        src     : item.attributes.img.url(),
                                                        comments: commentsData
                                                    };

                                                    if (item.attributes.user) {
                                                        obj.user = item.attributes.user.attributes,
                                                            obj.user.id = item.attributes.user.id;
                                                        obj.user = processImg(obj.user);
                                                    } else {
                                                        // remove gallery
                                                    }

                                                    data.push(obj);
                                                    cb();
                                                });
                                        });
                                });

                        });
                    });

                return defer.promise;
            }

            function get(item) {
                var defer = $q.defer();

                console.log(item);
                Loading.start();

                find(item)
                    .then(function (resp) {
                        console.log(resp);

                        var likes    = resp.relation('likes');
                        var comments = resp.relation('comments');

                        likes
                            .query()
                            .equalTo('gallery', item)
                            .equalTo('user', currentUser)
                            .count()
                            .then(function (liked) {

                                likes
                                    .query()
                                    .count()
                                    .then(function (likes) {

                                        comments
                                            .query()
                                            .include('commentBy')
                                            .descending('createdAt')
                                            .limit(limitComment)
                                            .find()
                                            .then(function (comments) {
                                                console.log(comments);

                                                var commentsData = [];

                                                angular.forEach(comments, function (item) {
                                                    var comment     = {
                                                        id  : item.id,
                                                        text: item.attributes.text,
                                                        user: item.attributes.commentBy.attributes
                                                    };
                                                    comment.user.id = item.id;
                                                    commentsData.push(comment);
                                                });

                                                var obj     = {
                                                    id      : item.id,
                                                    item    : item.attributes,
                                                    created : item.createdAt,
                                                    likes   : likes,
                                                    liked   : liked,
                                                    user    : item.attributes.user.attributes,
                                                    comments: commentsData
                                                };
                                                obj.user.id = item.attributes.user.id;
                                                obj.user    = processImg(obj.user);

                                                defer.resolve(obj);
                                                Loading.end();
                                            });
                                    });
                            });

                    });

                return defer.promise;
            }

            function processImg(obj) {
                console.log(obj);
                if (obj) {

                    if (obj.facebook) {
                        obj.src = (obj.facebookimg) ? obj.facebookimg : 'img/user.png';
                    } else {
                        obj.src = (obj.img) ? obj.img.url() : 'img/user.png';
                    }

                }
                return obj;
            }

            function find(id) {
                var defer = $q.defer();
                new Parse
                    .Query('Gallery')
                    .include('user')
                    .get(id)
                    .then(function (resp) {
                        defer.resolve(resp);
                    });
                return defer.promise;
            }


            function addComment(form) {
                var defer = $q.defer();
                Loading.start();
                console.log(form);
                find(form.galleryId)
                    .then(function (gallery) {
                        var Object = Parse.Object.extend('GalleryComment');
                        var item   = new Object();

                        angular.forEach(form, function (value, key) {
                            item.set(key, value);
                        });
                        item.set('commentBy', Parse.User.current());
                        item.set('gallery', gallery);

                        item.save(null)
                            .then(function (resp) {
                                console.log(resp);

                                addActivity({
                                    galeryId: form.galleryId,
                                    action  : 'add comment'
                                });

                                gallery
                                    .relation('comments')
                                    .add(resp);

                                gallery
                                    .save()
                                    .then(function (resp) {
                                        Loading.end();
                                        console.log(resp);
                                        defer.resolve(resp);
                                    })
                            });
                    });


                return defer.promise;
            }

            function isLiked(galleryId) {
                var defer = $q.defer();

                find(galleryId)
                    .then(function (gallery) {
                        new Parse
                            .Query('GalleryLike')
                            .equalTo('gallery', gallery)
                            .equalTo('user', currentUser)
                            .first()
                            .then(function (resp) {
                                console.warn(resp);
                                if (resp === undefined) {
                                    defer.reject(resp);
                                } else {
                                    defer.resolve(resp);
                                }
                            });
                    })

                return defer.promise;
            }

            function addLike(galleryId) {
                var defer = $q.defer();

                find(galleryId)
                    .then(function (gallery) {
                        var Object = new Parse.Object.extend('GalleryLike');
                        var item   = new Object();

                        item.set('user', currentUser);
                        item.set('gallery', gallery);

                        item.save(null)
                            .then(function (resp) {
                                console.log(resp);
                                gallery
                                    .relation('likes')
                                    .add(resp);

                                gallery
                                    .save()
                                    .then(function (resp) {
                                        console.log(resp);
                                        defer.resolve(resp);
                                    })
                            });
                    })
                return defer.promise;
            }

            //todo: removelike
            function removeLike(galleryId) {
                var defer = $q.defer();
                find(galleryId)
                    .then(function (gallery) {

                        new Parse
                            .Query('GalleryLike')
                            .equalTo('gallery', gallery)
                            .equalTo('user', currentUser)
                            .first()
                            .then(function (like) {
                                console.log(like);

                                gallery
                                    .relation('likes')
                                    .remove(like);

                                like
                                    .destroy(function (resp) {
                                        console.log(resp);
                                        defer.resolve(resp);
                                    })
                            });

                    })
                return defer.promise;
            }

            function likeGallery(gallery) {
                var defer = $q.defer();

                isLiked(gallery)
                    .then(function (resp) {
                        console.warn(resp);
                        if (resp) {
                            console.log('Remove Like');
                            var promise = removeLike(gallery);
                            addActivity({
                                galeryId: gallery,
                                action  : 'unlike like'
                            });

                        } else {
                            console.log('Add like');
                            var promise = addLike(gallery);
                            addActivity({
                                galeryId: gallery,
                                action  : 'add like'
                            });
                        }

                        promise
                            .then(function (resp) {
                                console.log(resp);
                                defer.resolve(resp);
                            });

                    })
                    .catch(function (err) {
                        console.log('Add like', err);

                        addActivity({
                            galeryId: gallery,
                            action  : 'add like'
                        });

                        addLike(gallery)
                            .then(function (resp) {
                                console.log(resp);
                                defer.resolve(resp);
                            })
                    })
                return defer.promise;
            }


            function getUser(userId) {
                var defer = $q.defer();

                //todo: get user
                //todo: count user gallery
                //todo: count user follow
                //todo: count user following

                Loading.start();

                if (userId === undefined) {
                    userId = currentUser.id;
                }

                console.log(userId);
                new Parse
                    .Query('User')
                    .equalTo('objectId', userId)
                    .first()
                    .then(function (resp) {
                        console.log(resp);
                        var obj  = resp.attributes;
                        obj.id   = resp.id;
                        var user = loadProfile(obj);

                        new Parse
                            .Query('Gallery')
                            .equalTo('user', resp)
                            .count()
                            .then(function (gallery) {
                                user.galleries = gallery;

                                new Parse
                                    .Query('UserFollow')
                                    .equalTo('user', resp)
                                    .count()
                                    .then(function (foloow) {
                                        user.follow = foloow;

                                        new Parse
                                            .Query('UserFollow')
                                            .equalTo('follow', resp)
                                            .count()
                                            .then(function (follow2) {
                                                user.follow2 = follow2;
                                                Loading.end();
                                                defer.resolve(user);
                                            })

                                    });
                            });
                    })
                //.catch (function (resp) {
                //    defer.reject (resp);
                //})


                return defer.promise;
            }

            function getUserGallery(userId) {
                var defer = $q.defer();
                var data  = new Array();
                //Loading.start ();

                if (userId === undefined) {
                    userId = currentUser.id;
                }

                User
                    .find(userId)
                    .then(function (user) {

                        new Parse
                            .Query('Gallery')
                            .equalTo('user', user)
                            .include('user')
                            .find()
                            .then(function (resp) {

                                var cb = _.after(resp.length, function () {
                                    defer.resolve(data);
                                });

                                _.each(resp, function (item) {
                                    //grab relations

                                    var likes    = item.relation('likes');
                                    var comments = item.relation('comments');

                                    likes
                                        .query()
                                        .equalTo('gallery', item)
                                        .equalTo('user', currentUser)
                                        .count()
                                        .then(function (liked) {

                                            likes
                                                .query()
                                                .count()
                                                .then(function (likes) {

                                                    comments
                                                        .query()
                                                        .include('commentBy')
                                                        .descending('createdAt')
                                                        .limit(limitComment)
                                                        .find()
                                                        .then(function (comments) {
                                                            console.log(comments);

                                                            var commentsData = [];

                                                            angular.forEach(comments, function (item) {
                                                                var comment     = {
                                                                    id  : item.id,
                                                                    text: item.attributes.text,
                                                                    user: item.attributes.commentBy.attributes
                                                                };
                                                                comment.user.id = item.id;
                                                                commentsData.push(comment);
                                                            });

                                                            var obj     = {
                                                                id      : item.id,
                                                                item    : item.attributes,
                                                                src     : item.attributes.img.url(),
                                                                created : item.createdAt,
                                                                likes   : likes,
                                                                liked   : liked,
                                                                user    : item.attributes.user.attributes,
                                                                comments: commentsData
                                                            };
                                                            obj.user.id = item.attributes.user.id;
                                                            obj.user    = processImg(obj.user);

                                                            data.push(obj);
                                                            cb();
                                                        });
                                                });
                                        });

                                });
                            });
                    })

                return defer.promise;
            }

            function listActivity() {
                var defer = $q.defer();

                new Parse
                    .Query('GalleryActivity')
                    .include('user')
                    .include('gallery')
                    .descending('createdAt')
                    .limit(50)
                    .find()
                    .then(function (resp) {
                        console.log(resp);
                        var data = [];
                        angular.forEach(resp, function (value, key) {
                            var obj     = value.attributes;
                            obj.id      = value.id;
                            obj.user    = (value.attributes.user) ? value.attributes.user.attributes : '';
                            obj.user    = processImg(obj.user);
                            obj.created = value.createdAt;
                            obj.img     = (value.attributes.gallery) ? value.attributes.gallery.attributes.img.url() : '';
                            console.log(obj);
                            data.push(obj);
                        });
                        defer.resolve(data);
                    });

                return defer.promise;
            }

            function addActivity(data) {
                /*
                 * ACTIONS
                 * add photo
                 * add comment
                 * like photo
                 * unlike photo
                 * register
                 * */
                gettextCatalog.getString('add photo');
                gettextCatalog.getString('add comment');
                gettextCatalog.getString('like photo');
                gettextCatalog.getString('unlike photo');
                gettextCatalog.getString('register');
                gettextCatalog.getString('registered');

                console.info(data);

                if (data.galleryId) {
                    find(data.galeryId)
                        .then(function (gallery) {
                            var Object = Parse.Object.extend('GalleryActivity');
                            var item   = new Object();

                            item.set('user', Parse.User.current());
                            item.set('gallery', gallery);
                            item.set('action', data.action);

                            item.save()
                                .then(function (resp) {
                                    console.warn(resp);
                                });
                        });
                } else {
                    var Object = Parse.Object.extend('GalleryActivity');
                    var item   = new Object();

                    item.set('user', Parse.User.current());
                    item.set('action', data.action);

                    item.save()
                        .then(function (resp) {
                            console.warn(resp);
                        });
                }
            }

            return {
                addActivity   : addActivity,
                listActivity  : listActivity,
                all           : all,
                add           : add,
                get           : get,
                find          : find,
                nearby        : nearby,
                getUser       : getUser,
                getUserGallery: getUserGallery,
                likeGallery   : likeGallery,
                allComment    : allComment,
                addComment    : addComment,
                getComments   : getComments,
                getLikes      : getLikes,
                search        : search,
                form          : form,
                formComment   : formComment,
                formShare     : formShare
            };

        });
})();
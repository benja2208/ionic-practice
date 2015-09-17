(function (window, angular, undefined) {
  'use strict';
  angular
    .module('ionic')
    .constant('AppConfig', {
      app: {
        name: 'Photogram',
        url: 'http://photogramapp.com',
        image: 'http://photogramapp.com/social-share.jpg',
      },
      routes: {
        home: 'gallery.home',
        login: 'intro'
      },
      color: '#00796B',
      facebook: '1024016557617380',
      parse: {
        applicationId: '7lWT9DJntSvMKTetpoT0wL79pTG9dk4ob5pztktX',
        clientKey: 'CIcH8fg5AogNNrEQ8IbmA5nujNjIvVNmuW0PyvCy',
        javascriptKey: 'UbrjB5Imc0btrAyoSb83HmCAHmFWc77JEB9AA1to'
      }
    });
})(window, window.angular);

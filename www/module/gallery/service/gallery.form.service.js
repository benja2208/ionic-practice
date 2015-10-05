(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .factory('GalleryForm', function ($translate) {

      var form = [{
        key: 'title',
        type: 'input',
        templateOptions: {
          type: 'text',
          placeholder: $translate.instant('TITLE'),
          icon: 'icon-envelope',
          required: true,
          iconPlaceholder: true,
          focus: true
        }
      }, {
        key: 'geo',
        type: 'toggle',
        templateOptions: {
          label: $translate.instant('GEOLOCATION'),
          toggleClass: 'positive'
        }
      }];

      var formComment = [{
        key: 'text',
        type: 'input',
        templateOptions: {
          placeholder: $translate.instant('ADDCOMMENT'),
          type: 'text',
          required: true,
          focus: true
            //icon           : 'icon-envelope',
            //iconPlaceholder: true
        }
      }];

      var formShare = [{
        key: 'facebook',
        type: 'toggle',
        templateOptions: {
          label: $translate.instant('Facebook'),
          toggleClass: 'positive'
        }
      }, {
        key: 'twitter',
        type: 'toggle',
        templateOptions: {
          label: $translate.instant('Twitter'),
          toggleClass: 'positive'
        }
      }, {
        key: 'whatsapp',
        type: 'toggle',
        templateOptions: {
          label: $translate.instant('Whatsapp'),
          toggleClass: 'positive'
        }
      }, {
        key: 'SMS',
        type: 'toggle',
        templateOptions: {
          label: $translate.instant('SMS'),
          toggleClass: 'positive'
        }
      }, {
        key: 'email',
        type: 'toggle',
        templateOptions: {
          label: $translate.instant('Email'),
          toggleClass: 'positive'
        }
      }, ];
      return {
        form: form,
        formComment: formComment,
        formShare: formShare
      };
    });
})(window, window.angular);

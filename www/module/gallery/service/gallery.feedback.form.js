(function(){
    'use strict';
    angular
        .module('module.gallery')
        .factory('GalleryFeedbackForm', function ($http, $q, $translate) {

            var form = [
                {
                    key            : 'title',
                    type           : 'input',
                    templateOptions: {
                        type       : 'text',
                        placeholder: $translate.instant('TITLE'),
                        required   : true
                    }
                },
                {
                    key            : 'subject',
                    type           : 'select',
                    templateOptions: {
                        label          : $translate.instant('SUBJECT'),
                        options        : [
                            {
                                'label': $translate.instant('COMPLAINT'),
                                'id'   : 'complaint',
                            },
                            {
                                'label': $translate.instant('BUG'),
                                'id'   : 'bug',
                            },
                            {
                                'label': $translate.instant('SUGGESTION'),
                                'id'   : 'suggestion',
                            }
                        ],
                        valueProp      : 'id',
                        labelProp      : 'label',
                        icon           : 'icon-list',
                        iconPlaceholder: true
                    }
                },
                {
                    key            : 'status',
                    type           : 'textarea',
                    templateOptions: {
                        type           : 'text',
                        placeholder    : $translate.instant('COMMENT'),
                        icon           : 'ion-quote',
                        required       : true,
                        iconPlaceholder: true
                    }
                }
            ];

            return {
                form: form
            }
        });
})();
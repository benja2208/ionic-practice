(function () {
    'use strict';
    angular
        .module('module.user')
        .controller('IntroCtrl', function (gettextCatalog) {
            var vm = this;

            vm.slides = [
                {
                    top       : gettextCatalog.getString('Share your most amazing moments'),
                    img       : 'img/intro1-phone.png'
                },
                {
                    top       : gettextCatalog.getString('Follow your friends and relive'),
                    img       : 'img/intro2-phone.png'
                },
                {
                    top       : gettextCatalog.getString('Find and follow people around'),
                    img       : 'img/intro3-phone.png'
                },
                {
                    top       : gettextCatalog.getString('Enjoy the most amazing photos'),
                    img       : 'img/intro4-phone.png'
                }

            ];

            vm.slideIndex = 0;

            // Called each time the slide changes
            vm.slideChanged = function (index) {
                vm.slideIndex = index;
            };

        })
    ;
})();
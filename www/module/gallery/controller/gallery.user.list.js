(function (window, angular, undefined) {
  'use strict';
  angular
    .module('module.gallery')
    .controller('GalleryUserListCtrl', function (User, Loading, $state) {
      var vm = this;

      User
        .list()
        .then(function (resp) {
          vm.data = resp;
          console.log(resp);
        });

      vm.submitFollow = function () {

        var users = vm.data.filter(function (item) {
          return item.follow == true;
        });

        Loading.start();
        User
          .addFollows(users)
          .then(function (resp) {
            Loading.end();
            console.log(resp);
            $state.go('gallery.home', {
              clear: true
            });
          });
        console.log(users);

      };
    });
})(window, window.angular);

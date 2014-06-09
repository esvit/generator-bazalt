define(['base/login/module'], function (module) {

    module.controller('BaseHomeCtrl', ['$scope', '$location', 'bzUser', function ($scope, $location, bzUser) {

        if (!bzUser.is_guest) {
            $location.path('/dashboard');
        }

    }]);

});
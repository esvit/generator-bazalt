define([
    'modules/auth/login/module'
], function (module) {
    'use strict';

    module.controller('AuthLoginCtrl', ['$scope', 'bzUser', function($scope, bzUser) {
        $scope.login = function(user) {
            bzUser.$login(user);
        }
    }]);

});
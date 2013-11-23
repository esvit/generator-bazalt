define([
    'app'
], function (app) {
    'use strict';

    app.controller('loginCtrl', ['$scope', 'bzUser', function($scope, bzUser) {
        $scope.login = function(user) {
            bzUser.$login(user);
        }
    }]);

});
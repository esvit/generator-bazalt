define([
    'angular', 'app'
], function (angular, app) {
    'use strict';

    app.config(['$routeProvider', '$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', 'bzUserProvider',
        function ($routeProvider, $routeSegmentProvider, $locationProvider, bzConfig, bzUser) {
            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

            $routeSegmentProvider
                .when('/', 'home')
                .segment('home', {
                    controller: 'homeCtrl',
                    templateUrl: '/views/index.html',
                    resolve: {
                        permissions: bzUser.access()
                    },
                    resolveFailed: bzConfig.errorResolver()
                });

            $routeProvider.otherwise({
                redirectTo: '/'
            });
        }]);

});
define([
    'angular', 'app'
], function (angular, app) {
    'use strict';

    app.config(['$routeProvider', '$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', 'bzUserProvider', '$httpProvider',
        function ($routeProvider, $routeSegmentProvider, $locationProvider, bzConfig, bzUser, $httpProvider) {
            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

            $httpProvider.defaults.withCredentials = false;
            $routeSegmentProvider.options.autoLoadTemplates = true;

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
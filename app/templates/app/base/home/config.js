define([
    'base/home/module',

    'base/home/controllers/BaseHomeCtrl'
], function (module) {
    'use strict';

    module.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzUserProvider',
        function($routeSegmentProvider, bzConfigProvider, bzUser) {
            $routeSegmentProvider
                .when('/', 'home')
                .segment('home', {
                    templateUrl: '/themes/default/views/home.html',
                    resolve: {
                        permissions: bzUser.access()
                    },
                    controller: 'BaseHomeCtrl',
                    resolveFailed: bzConfigProvider.errorResolver()
                });
    }]);
    return module;

});
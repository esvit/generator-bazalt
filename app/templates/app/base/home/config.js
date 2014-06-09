define([
    'base/home/module',

    'base/home/controllers/BaseHomeCtrl'
], function (module) {
    'use strict';

    module.config(['$routeSegmentProvider', 'bzConfigProvider', 'bzUserProvider',
        function($routeSegmentProvider, bzConfigProvider, bzUserProvider) {
            $routeSegmentProvider
                .when('/', 'home')
                .segment('home', {
                    templateUrl: bzConfigProvider.templateUrl('/home.html'),
                    resolve: {
                        permissions: bzUserProvider.access()
                    },
                    controller: 'BaseHomeCtrl',
                    resolveFailed: bzConfigProvider.errorResolver()
                });
    }]);
    return module;

});
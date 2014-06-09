define([
    'base/config/module'
], function (module) {
    'use strict';

    module.config(['$routeSegmentProvider', '$locationProvider', 'bzConfigProvider', 'bzLanguageProvider',
        function ($routeSegmentProvider, $locationProvider, bzConfigProvider, bzLanguageProvider) {
            $locationProvider
                .html5Mode(true)
                .hashPrefix('!');

            $routeSegmentProvider.options.autoLoadTemplates = true;
            // $logProvider.debugEnabled(false);

            bzConfigProvider.templatePrefix('/views');

            bzLanguageProvider.id(window.bazalt.language);
        }]);

    return module;

});
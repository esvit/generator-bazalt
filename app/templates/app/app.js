define([
    'angular',
    '../bazalt',
    'bz',

    'base/config',
    'modules/auth/config',

    'views'
], function (angular) {
    'use strict';

    return angular.module('app', [
        'bz',

        'base',

        'module.auth',

        'views'
    ]);
});
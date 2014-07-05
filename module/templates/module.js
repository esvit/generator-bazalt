define([
    'angular',

    'modules/<%= scriptAppName %>/login/config'
], function (angular) {
    'use strict';

    return angular.module('module.auth', [
        'module.auth.login'
    ]);
});
define([
    'angular',

    'modules/auth/login/config'
], function (angular) {
    'use strict';

    return angular.module('module.auth', [
        'module.auth.login'
    ]);
});
/* jshint browser:true, jquery:true */
define('main', [
    'angular', 'app', 'controllers', 'routes'
], function(angular, app) {
    'use strict';

    //clearTimeout(window.startup);

    angular.bootstrap(document.documentElement, [app.name]);
});
/*
//Fix bug in Firefox when script not run when open in new tab
window.startup = setTimeout(function() {
    'use strict';

    if (typeof angular != 'undefined') {
        angular.bootstrap(document.documentElement, ['app']);
    }
    if (typeof window.callPhantom === 'function') {
        window.callPhantom({ status: 'done' });
    }
}, 2000);*/
/**
 * UX Rocket Preloader
 * Line type page loading indicator
 * @author Bilal Cinarli
 */

(function(factory) {
    'use strict';
    if(typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if(typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory();
    } else {
        // Browser globals
        factory(window);
    }
}(function() {
    'use strict';

    var ux;

    var Preloader = function() {

    };
}));
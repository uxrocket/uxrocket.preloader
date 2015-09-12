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
        factory();
    }
}(function($) {
    'use strict';

    var ux,
        rocketName = 'uxrPreloader',

        defaults = {
            addTo    : 'body',
            className: 'uxr-preloader'
        },

        ns = {
            prefix: 'uxr-',
            rocket: 'uxRocket',
            data  : rocketName,
            name  : 'preloader'
        };

    var Preloader = function(el, options, selector) {
        this.init();
    };

    Preloader.prototype = {
        init: function() {
            this.el = document.getElementsByClassName('uxr-preloader')[0];

            if(!this.el) {
                this.prepare();
                this.el = document.getElementsByClassName('uxr-preloader')[0];
            }
        },

        prepare: function() {
            var body = document.getElementsByTagName('body')[0],
                template = document.createElement('div');

            this.addClass('uxr-preloader', template);

            body.insertBefore(template, body.firstChild);
        },

        startLoading: function() {
            this.addClass('uxr-preloader-start');
        },

        endLoading: function() {
            this.removeClass('uxr-preloader-end');
        },

        addClass: function(className, el) {
            var _el = el || this.el;

            if(_el.classList)
                _el.classList.add(className);
            else
                _el.className += ' ' + className;
        },

        removeClass: function(className, el) {
            var _el = el || this.el;

            if(_el.classList)
                _el.classList.remove(className);
            else
                _el.className = _el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    };
}));
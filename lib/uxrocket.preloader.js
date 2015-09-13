/**
 * UX Rocket Preloader
 * Line type page loading indicator
 * @author Bilal Cinarli
 */

(function(factory) {
    'use strict';
    if(typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if(typeof exports === 'object' && typeof require === 'function') {
        // Browserify
        factory(jQuery);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($) {
    'use strict';

    var ux,
        rocketName = 'uxrPreloader',

        defaults = {
            className : 'uxr-preloader',
            startClass: 'uxr-preloader-start',
            endClass  : 'uxr-preloader-end'
        },

        ns = {
            prefix: 'uxr-',
            rocket: 'uxRocket',
            data  : rocketName,
            name  : 'preloader'
        };

    var Preloader = function(el, options, selector) {
        this._name = rocketName;
        this._defaults = defaults;

        this.el = el;
        this.$el = $(el);
        this.options = $.extend(true, {}, defaults, options, this.$el.data());
        this.selector = selector;

        this.init();
    };

    $.extend(Preloader.prototype, {
        init: function() {
            if(this.checkPreloader() === 0) {
                this.addPreloader();
            }

            this.preloader = this.$el.find('> .' + this.options.className);
        },

        startLoading: function() {
            this.preloader.addClass(this.options.startClass);
        },

        endLoading: function() {
            this.preloader.addClass(this.options.endClass);
        },

        checkPreloader: function() {
            return this.$el.find('> .' + this.options.className).length;
        },

        addPreloader: function() {
            this.$el.prepend('<div class="' + this.options.className + '"></div>');
        }
    });

    ux = $.fn.uxrpreloader = $.uxrpreloader = function(options) {
        var selector = this.selector;

        // direct call to Preloader
        if(typeof this === "function") {
            var $el = $('body');
            $.data($el[0], ns.data, new Preloader($el[0], options, $el.selector));
        }

        return this.each(function() {
            if($.data(this, ns.data)) {
                return;
            }

            // Bind the plugin and attach the instance to data
            $.data(this, ns.data, new Preloader(this, options, selector));
        });
    };

    ux.version = '0.1.0';
}));
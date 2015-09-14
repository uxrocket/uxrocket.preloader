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
            className    : 'uxr-preloader',
            startClass   : 'uxr-preloader-start',
            endClass     : 'uxr-preloader-end',
            autoStart    : false,
            resetAfterEnd: true
        },

        events = {
            transitionend: 'transitionend.uxrPreloader',
            animationend : 'animationend.uxrPreloader'
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
            this.$el.addClass('uxr-preloader-ready');

            if(this.checkPreloader() === 0) {
                this.addPreloader();
            }

            this.preloader = this.$el.find('> .' + this.options.className);

            if(this.options.autoStart) {
                this.startLoading();
            }
        },

        startLoading: function() {
            var _this = this;

            setTimeout(function() {
                _this.preloader.addClass(_this.options.startClass);
            }, 0);
        },

        endLoading: function() {
            var _this = this;

            this.preloader.addClass(this.options.endClass);

            if(this.options.resetAfterEnd) {
                _this.afterEnd();
            }
        },

        resetLoading: function() {
            this.preloader.removeClass(this.options.startClass + ' ' + this.options.endClass);
        },

        restartLoading: function() {
            this.resetLoading();
            this.startLoading();
        },

        afterEnd: function() {
            var _this = this;

            this.preloader.on(events.transitionend + ' ' + events.animationend, function() {
                _this.resetLoading();
                _this.preloader.off(events.transitionend + ' ' + events.animationend);
            });
        },

        checkPreloader: function() {
            return this.$el.find('> .' + this.options.className).length;
        },

        addPreloader: function() {
            this.$el.prepend('<div class="' + this.options.className + '"></div>');
        },

        removePreloader: function() {
            this.preloader.remove();
        },

        removeClasses: function() {
            this.$el.removeClass('uxr-preloader-ready');
        },

        destroy: function() {
            return ux.destroy(this.el);
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

    ux.destroy = function(el) {
        var $el = el !== undefined ? $(el) : $('.uxr-preloader-ready');

        $el.each(function() {
            var _this = $(this),
                _instance = _this.data(ns.data),
                _uxrocket = _this.data(ns.rocket);

            // remove ready class
            _instance.removeClasses('uxr-preloader-ready');

            // remove container
            _instance.removePreloader();

            // remove plugin data
            _this.removeData(ns.data);
        });
    };

// version
    ux.version = '0.2.0';

// default settings
    ux.settings = defaults;
}));
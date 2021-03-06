/**
 * jquery.widthWatch.js v1.2 - https://github.com/munehiroKABUHARA/jquery.widthWatch.js
 * Copyright 2015 Munehiro KABUHARA,
 * Licensed under MIT
 */


(function($) {
    $.fn.widthWatch = function(options) {
        var defaults = {
            pc_bp: 950,
            tb_bp: 768,
            iphn6_bp: 375,
            landscape_bp: 568,
            portlate_bp: 320,
            pcClass: 'pc-style',
            tabClass: 'tab-style',
            iphn6Class: 'iphn6-style',
            spClass: 'sp-style',
            oriPortlate: 'portrait-style',
            oriLandscape: 'landscape-style',
            androidClass: 'android-style',
            iOSClass: 'iOS-style',
            timer: false,
            resizeOn_pc: function() {
                return true;
            },
            resizeOn_tb: function() {
                return true;
            },
            resizeOn_sp: function() {
                return true;
            }
        }
        var setting = $.extend(defaults, options);
        var el = this,
            windowWidth = $(window).width(),
            defElClass  = el.attr('class'),
            targetIphone = navigator.userAgent.indexOf('iPhone'),
            targetIPod = navigator.userAgent.indexOf('iPod'),
            targetAndroid = navigator.userAgent.indexOf('Android');
        var init = function() {
            windowWidth = $(window).width(), targetIphone = navigator.userAgent.indexOf('iPhone'), targetIPod = navigator.userAgent.indexOf('iPod'), targetAndroid = navigator.userAgent.indexOf('Android');

            if (windowWidth >= setting.pc_bp) {
                el.attr('class', '');
                el.addClass(defElClass);
                el.addClass(setting.pcClass);
                setting.resizeOn_pc.call(el);
            } else if (windowWidth >= setting.tb_bp) {
                el.attr('class', '');
                el.addClass(defElClass);
                el.addClass(setting.tabClass);
                setting.resizeOn_tb.call(el);
            } else if(windowWidth < setting.tb_bp){
                el.attr('class', '');
                el.addClass(defElClass);
                el.addClass(setting.spClass);
                if(windowWidth >= setting.landscape_bp){
                    el.addClass(setting.oriLandscape);
                }else if(windowWidth >= setting.iphn6_bp){
                    el.addClass(setting.iphn6Class);
                }else if(windowWidth >= setting.portlate_bp){
                    el.addClass(setting.oriPortlate);
                }
                setting.resizeOn_sp.call(el);
            }
            if (targetIphone > 0 || targetIPod > 0) {
                el.addClass(setting.iOSClass);
                el.removeClass(setting.androidClass);
            } else if (targetAndroid > 0) {
                el.addClass(setting.androidClass);
                el.removeClass(setting.iOSClass);
            } else {
                el.removeClass(setting.iOSClass);
                el.removeClass(setting.androidClass);
            }
        }
        init();
        $(window).resize(function() {
            if (setting.timer !== false) {
                clearTimeout(setting.timer);
            }
            setting.timer = setTimeout(function() {
                init();
            }, 100);
        });
        return (this);
    };
})(jQuery);
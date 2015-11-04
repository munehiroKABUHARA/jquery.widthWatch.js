/**
 * jquery.widthWatch.js v1.1 - https://github.com/munehiroKABUHARA/jquery.widthWatch.js
 * Copyright 2015 Munehiro KABUHARA,
 * Licensed under MIT
 */

(function($) {
    $.fn.widthWatch = function(options){
        var defaults = {
        	pc_bp : 950,
        	tb_bp : 768,
        	retina_bp : 640,
        	iphn6 : 375,
        	sp_bp1 : 480,
        	sp_bp2 : 320,
        	pcClass : 'pc-style',
        	tabClass : 'tab-style',
        	retinaClass : 'retina-style',
        	iphn6Class : 'iphn6-style',
        	spClass : 'sp-style',
        	androidClass : 'android-style',
        	iOSClass: 'iOS-style',
        	timer : false,
    		resizeOn_pc: function() { return true; },
    		resizeOn_tb: function() { return true; },
    		resizeOn_sp: function() { return true; }
        }

        var setting = $.extend(defaults, options);

    	var el = this,
	    	windowWidth   = $(window).width(),
	    	targetIphone  = navigator.userAgent.indexOf('iPhone'),
	    	targetIPod    = navigator.userAgent.indexOf('iPod'),
	    	targetAndroid = navigator.userAgent.indexOf('Android');

		var init = function() {
	    	windowWidth   = $(window).width(),
	    	targetIphone  = navigator.userAgent.indexOf('iPhone'),
	    	targetIPod    = navigator.userAgent.indexOf('iPod'),
	    	targetAndroid = navigator.userAgent.indexOf('Android');

			if(windowWidth >= setting.pc_bp){
				el.attr('class','');
				el.addClass(setting.pcClass);
				setting.resizeOn_pc.call(el);
			}else if(windowWidth >= setting.tb_bp){
				el.attr('class','');
				el.addClass(setting.tabClass);
				setting.resizeOn_tb.call(el);
			}else if(windowWidth >= setting.retina_bp){
				el.attr('class','');
				el.addClass(setting.retinaClass);
				el.addClass(setting.spClass);
			}else if(windowWidth >= setting.sp_bp1){
				el.attr('class','');
				el.addClass(setting.spClass);
				setting.resizeOn_sp.call(el);
			}else if(windowWidth >= setting.sp_bp2){
				el.attr('class','');
				el.addClass(setting.spClass);
				setting.resizeOn_sp.call(el);
			}

			if(targetIphone > 0 || targetIPod > 0){
				el.addClass(setting.iOSClass);
				el.removeClass(setting.androidClass);
			}else if(targetAndroid > 0){
				el.addClass(setting.androidClass);
				el.removeClass(setting.iOSClass);
			}else{
				el.removeClass(setting.iOSClass);
				el.removeClass(setting.androidClass);
			}
		}
		init();

		$(window).resize(function() {
		    if (setting.timer !== false) { clearTimeout(setting.timer); }
		    setting.timer = setTimeout(function() {
		    	init();
		    }, 100);
		});

        return(this);

    };
})(jQuery);
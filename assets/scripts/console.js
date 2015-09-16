// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(global) {
	'use strict';
	global.console = global.console || {};
	var con = global.console,
		prop, method,
		empty = {},
		dummy = function() {},
		properties = 'memory'.split(','),
		methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
	while (prop = properties.pop()) if (!con[prop]) con[prop] = empty;
	while (method = methods.pop()) if (!con[method]) con[method] = dummy;
})(typeof window === 'undefined' ? this : window);

!function() {
    function e(e, t) {
        var n = 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 15px;' + (e ? "font-weight: bold;" : "") + "color: " + t + ";";
        return n
    }

    console.log("%c♥ Hello %c--> %cWorld", e(!0, "#d22"), e(!0, "#777"), e(!0, "#2b2"));
}();
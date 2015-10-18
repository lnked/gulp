(function( $ ){
  	$.fn.myPluginName = function() {
    	// your plugin logic
  	};
})( jQuery );



;( function( $ ){
	$.fn.extend( {
		pluginname: function( options ) {
			this.defaults = {};
			var settings = $.extend( {}, this.defaults, options );
			return this.each( function() {
				var $this = $( this );
			});
		}
	});
})( jQuery );



/*!
 * jQuery 'best options' plugin boilerplate
 * Author: @cowboy
 * Further changes: @addyosmani
 * Licensed under the MIT license
 */
;(function ( $, window, document, undefined ) {
    $.fn.pluginName = function ( options ) {
        // Here's a best practice for overriding 'defaults'
        // with specified options. Note how, rather than a
        // regular defaults object being passed as the second
        // parameter, we instead refer to $.fn.pluginName.options
        // explicitly, merging it with the options passed directly
        // to the plugin. This allows us to override options both
        // globally and on a per-call level. 
        options = $.extend( {}, $.fn.pluginName.options, options );

        return this.each(function () {
            var elem = $(this);
        });
    };
    // Globally overriding options
    // Here are our publicly accessible default plugin options
    // that are available in case the user doesn't pass in all
    // of the values expected. The user is given a default
    // experience but can also override the values as necessary.
    // eg. $fn.pluginName.key ='otherval';
    $.fn.pluginName.options = {
        key: "value",
        myMethod: function ( elem, param ) {
        }
    };
})( jQuery, window, document );



;(function ( $, window, document, undefined ) {
    var pluginName = 'defaultPluginName',
        defaults = {
            propertyName: "value"
        };

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin( this, options ));
            }
        });
    }
})( jQuery, window, document );



/* Title: Immediate object initialization
 Description: this pattern is mainly suitable for one-off tasks
 */
({
	// here you can define setting values
	// a.k.a. configuration constants
	maxwidth:600,
	maxheight:400,
	// you can also define utility methods
	gimmeMax:function () {
		return this.maxwidth + "x" + this.maxheight;
	},
	// initialize
	init:function () {
		console.log(this.gimmeMax());
		// more init tasks...
	}
}).init();



/* Title: Returning functions
 Description: one function returns another function or create another function on-demand
 */
var setup = function () {
	console.log(1);
	return function () {
		console.log(2);
	};
};
// using the setup function
var my = setup(); // alerts 1
my(); // alerts 2
 
// Your setup function can store some private data in a closure and use that data somehow.
// Here setup() creates a counter function, which gives a next ID for example. But the count variable is not exposed.

var setup = function () {
	var count = 0;
	return function () {
		return ++count;
	};
};
// usage
var next = setup();
//next(); // returns 1
//next(); // returns 2
//next(); // returns 3
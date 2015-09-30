;(function($){
  	$.fn.timeoutClass = function(classname, timeout) {
  		timeout = timeout || 10;
  		var that = this;
  		setTimeout(function(){
  			$(that).toggleClass(classname);
  		}, timeout);
  	};
})(jQuery);

/*
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
*/

function is_touch_device()
{
    return ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch || 'onmsgesturechange' in window);
}

function media_enabled()
{
	if ($(window).width() <= 1200)
	{
		return true;
	}
	return false;
}

$(document).ready(function() {
	
	$.popup.init('.trigger-popup');
    //$.popup.open('popup-test', false);

	//Mustache.to_html('tmpl_mustache', data);

	/*
	var view = {
	  title: "Joe",
	  calc: function () {
	    return 2 + 4;
	  }
	};

	var output = Mustache.render("{{title}} spends {{calc}}", view);
	alert( output );
	*/

	function loadUser() {

		var data = {
		    header : "Новый пост",
		    content: "Первая строка<br />Вторая",
		    authors: ["alex", "daemon", "john"],
		    accent : function () {
		        return function (text, render) {
		            text = render(text);
		            return '<strong>' + text + '</strong>';
		        }
		    },
		    "name": "Chris",
			"company": "<b>GitHub</b>",
			"stooges": [
			    { "name": "Moe" },
			    { "name": "Larry" },
			    { "name": "Curly" }
		  	]
		}; 

		alert( template('tmpl_mustache') );
		alert( template('tmpl_mustache', data) );
		alert( template('tmpl_mustache') );
	}

	var $body = $('body'), $navigation = $('#navigation');

	$(".sense-phonemask").mask("+ 7 (999) 999-99-99");
	$(".sense-cartnumber").mask("999-999-999");

	$('.quantity').quantity();
	$('.trigger-dropdown').popover();
	
	var showtrigger = 'mouseenter',
		hidetrigger = 'mouseleave';

	if (is_touch_device() || media_enabled())
	{
		showtrigger = 'click';
		hidetrigger = 'click';
	}

	$body.on(showtrigger, '.nav__item', function(e){
		var $item = $(this),
			$link = $item.find('.nav__link'),
			$submenu = $item.find('.submenu');

		if ($submenu.length) {
			e.preventDefault();
		}

		if (!$item.hasClass('active'))
		{
			$submenu.addClass('block');
			$link.addClass('hover');
			
			setTimeout(function(){
				$item.addClass('active');
			}, 10);

			setTimeout(function(){
				$submenu.addClass('success');
			}, 150);
		}
	});

	$body.on(hidetrigger, '.nav__item.active', function(e){
		e.preventDefault();

		var $item = $(this),
			$link = $item.find('.nav__link'),
			$submenu = $item.find('.submenu');

		$item.removeClass('active');

		setTimeout(function(){
			$submenu.removeClass('success');
			$link.removeClass('hover');
		}, 10);

		setTimeout(function(){
			$submenu.removeClass('block');
		}, 150);
	});

	$body.on('click', '.menu-trigger', function(e){
        e.preventDefault();
		if ($body.hasClass('page-visible'))
		{
			setTimeout(function(){
				$body.removeClass('page-visible');
			}, 310);
		}
		else {
			$body.addClass('page-visible');
		}
		
		$body.toggleClass('page-open');		

        var visibility = 'visible';

        if (!$body.hasClass('page-open'))
        {
            visibility = 'hidden'
        }
        
        $('#menu-overlay').css({
            'visibility': visibility
        });

        return !1;
    });

	$body.on('click', '.wrap', function(e){
        $body.removeClass('page-open');

        setTimeout(function(){
			$body.removeClass('page-visible');
		}, 310);

        $('#menu-overlay').css({
            'visibility': 'hidden'
        });
    });

});
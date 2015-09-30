/*
$.popup.init('.trigger-popup');
$.popup.open('popup-choose-photo-source');
*/

;(function($) {
	"use strict";

	var options = {
		speed: 350,
		overlay: {
			enable: true,
			element: '#overlay'
		},
		hashCheck: true,
		hashChange: true,
		keyHooks: true
	},
	$trigger = '', $body = $('body'), $win = $(window), $doc = $(document), overlay = {}, resizeTimeout, popup = null;

	$.overlay = {
		close: function() {
			$(options.overlay.element).removeClass('animate');

			setTimeout(function(){
            	$(options.overlay.element).removeClass('visible is-open');
            	$(options.overlay.element).filter('.temp').remove();
            }, options.speed);
		}
	};
	
	$.popup = {
		close: function(callback) {
			popup = this;

            var scroll = 0, $popups = $('body').find('.popup.is-open'), cb = false;

            if (typeof callback !== 'undefined') {
            	cb = true;
            }

            if (options.overlay) {
				$.overlay.close();
	        };

            $popups.removeClass('animate');

            setTimeout(function(){
            	$popups.removeClass('visible is-open');
            	$popups.filter('.temp').remove();
            	$('body').trigger('popup.after_close');

            	if (cb)
            	{
	            	setTimeout(function(){
		            	callback.apply();
		            }, 10);
	           	}
            }, options.speed);

			if (!cb)
        	{
	            $body.removeClass('popup-open');

		        if(options.hashChange) {
	            	scroll = $win.scrollTop();
	        		window.location.hash = '';
	            	$win.scrollTop(scroll);
	            }
	        }
	        
            $('body').trigger('popup.close');

            return this;
        },
        hooks: function() {
        	popup = this;

			$body.on('click', '.trigger-popup-close', function(e) {
	            e.preventDefault ? e.preventDefault() : e.returnValue = false;
	            popup.close();
	        });

			if (options.keyHooks) {
				$body.on('keydown', function(e) {
					if(e.keyCode == 27) {
		                popup.close();
		            }
		        });
			};

	        if (options.overlay) {
				$(options.overlay.element).on('click', function() {
	            	popup.close();
	            });
	        };

	        $win.on('resize.popup', function() {
	            clearTimeout(resizeTimeout);
                
                resizeTimeout = setTimeout(function() {
                    
                    $('body').find('.popup.is-open').each(function() {
	                    popup.rePosition($(this));
	                });

                }, 100);
	        });

	        return this;
		},
        show: function(selector, overlay) {
        	if (typeof selector !== 'undefined' && selector !== '')
			{
				var data = data || {}, prop = {}, $popup;
			
				$body.addClass('popup-open');
				
				if ($('#'+selector).hasClass('popup'))
				{
					$popup = $('#'+selector);
				}
				else if ($('#'+selector).length && $('#'+selector).get(0).tagName == 'SCRIPT')
				{
					$popup = $(template(selector, data));
					$popup.addClass('temp');

					$body.append($popup);
				}

				$popup.addClass('visible is-open');
				$popup.css(popup._getPosition($popup));

				if (overlay) {
					$(options.overlay.element).addClass('visible');

					setTimeout(function(){
						$(options.overlay.element).addClass('animate');
					}, 10);
				}

				setTimeout(function(){
					$popup.addClass('animate');
					$('body').trigger('popup.after_open', $popup);
	    		}, 10);

	            $('body').trigger('popup.open', $popup);
			}

			return this;
        },
        open: function(selector, overlay) {
        	popup = this;

        	if (typeof overlay == 'undefined')
        	{
        		overlay = options.overlay.enable;
        	}

        	popup.close(function(){
        		popup.check(selector, overlay);
        	});
		},
        clicks: function(trigger) {
        	popup = this;
        	
        	$(trigger).on('click', function(e) {
				if (!options.hashChange)
				{
					e.preventDefault ? e.preventDefault() : e.returnValue = false;
				}

				if ($(this).attr('href'))
				{
					popup.check($(this).attr('href'));
				}
				else if ($(this).data('popup'))
				{
					popup.check($(this).data('popup'));
				}
			});

			return this;
		},
		check: function(selector, overlay) {
			popup = this;

			if (typeof selector == 'undefined' && options.hashChange && window.location.hash.length > 1)
			{
				selector = window.location.hash;
			}
			else if (typeof selector !== 'undefined')
			{
				if (selector.substr(0, 1) == '#')
				{
					selector = selector;
				}
			}

			if (typeof selector !== 'undefined')
			{
				if (selector.substr(0, 1) == '#')
				{
					selector = selector.substr(1);
				}

				if ($('#tpl-' + selector).length)
				{
					selector = 'tpl-'+selector;
				}

				if (typeof overlay == 'undefined')
	        	{
	        		overlay = options.overlay.enable;
	        	}

				if ($('#'+selector).hasClass('popup') || ($('#'+selector).length && $('#'+selector).get(0).tagName == 'SCRIPT')) {
					popup.show(selector, overlay);
				}
			}
	
	    	return this;
		},
        _getPopup: function(selector) {
            var $popup;

            if(typeof(selector) == 'object') {
                return selector;
            }

            $popup = $('#'+selector);

            return $popup.length ? $popup : null;
        },
        _getPosition: function($popup) {
        	popup = this;

			var prop = {},
				ww = $win.width(),
                wh = $win.height(),
                
                dw = $doc.width(),
                dh = $doc.height(),
                
                pw = $popup.outerWidth(),
                ph = $popup.outerHeight(),
                
                st = $win.scrollTop(),

                left = 0,
                top = 0,
                css = {},

                posType = $popup.attr('data-position'),

                $realWrapper = null;

            if(dw >= pw) {
                left = Math.round((dw - pw)/2);
            }
            
            if(wh >= ph) {
                css.position = 'fixed';
                top = '50%';
                css.marginTop = '-' + Math.floor( ph / 2 ) + 'px';
            }
            else {
            	css.position = 'absolute';
                top = st+Math.round((wh - ph)/2);
            }
            
            css.top = top;

            if(posType == 'right') {
                css.right = 0;
            }
            else {
                css.left = left;
            }

            return css;
		},
        rePosition: function(selector) {
            var $popup = this._getPopup(selector);
            
            $popup.css(this._getPosition($popup));
        },
        init: function(trigger) {
			this.check();
			this.clicks(trigger);
			this.hooks();
		}
	};

})(jQuery);